/**
 * Validator — Atividade 2 — Suíte Unitária sobre app RN (TAM).
 *
 * Stack: Expo SDK 52 (RN 0.76 + React 18.3) — RNTL de componente funciona.
 *
 * Critérios (10 pts total):
 *   1. Jest + React Native Testing Library configurados        — 2pts
 *   2. Mín 4 arquivos *.test.{ts,tsx} ou *.spec                — 3pts
 *   3. Configuração de cobertura (script ou jest.config)       — 2pts
 *   4. Teste de TELA (RNTL): render + fireEvent/screen         — 2pts
 *   5. README com comandos de execução                          — 1pt
 */

import { writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import {
  type GradeCriterion,
  type GradeResult,
  buildBreakdowns,
  computeScore,
  passThreshold,
} from '../compute-score.js';
import { parseArgs, findFiles, findReadme, readJsonSafe, readFileSafe } from '../utils.js';

async function main() {
  const args = parseArgs();
  const criteria: GradeCriterion[] = [];

  // Critério 1: Jest + RNTL
  const pkgPath = join(args.entrega, 'package.json');
  const pkg = readJsonSafe<any>(pkgPath);
  const allDeps = pkg ? { ...(pkg.dependencies ?? {}), ...(pkg.devDependencies ?? {}) } : {};
  const hasJest = 'jest' in allDeps || 'jest-expo' in allDeps
    || existsSync(join(args.entrega, 'jest.config.js')) || existsSync(join(args.entrega, 'jest.config.ts'));
  const hasRNTL = '@testing-library/react-native' in allDeps;
  const setupOk = hasJest && hasRNTL;
  criteria.push({
    id: 'jest-rntl-config',
    description: 'Jest + React Native Testing Library configurados',
    weight: 2,
    earned: setupOk ? 2 : hasJest ? 1 : 0,
    publicNote: setupOk ? 'Jest + RNTL detectados' : hasJest ? 'Jest ok, RNTL ausente' : 'Jest não encontrado',
  });

  // Critério 2: arquivos de teste
  const testExts = ['.test.ts', '.test.tsx', '.test.js', '.test.jsx', '.spec.ts', '.spec.tsx', '.spec.js', '.spec.jsx'];
  const testFiles = findFiles(args.entrega, testExts);
  const minTests = 4;
  criteria.push({
    id: 'min-tests',
    description: `Mín ${minTests} arquivos de teste (*.test/*.spec)`,
    weight: 3,
    earned: testFiles.length >= minTests ? 3 : +(testFiles.length / minTests * 3).toFixed(2),
    publicNote: `${testFiles.length}/${minTests} arquivos encontrados`,
  });

  // Critério 3: cobertura
  const pkgScripts = pkg?.scripts ?? {};
  const hasCoverageScript = Object.values(pkgScripts).some((s: any) =>
    typeof s === 'string' && /coverage/.test(s)
  );
  const coverageInConfig = readFileSafe(join(args.entrega, 'jest.config.js'))?.includes('collectCoverage')
    || readFileSafe(join(args.entrega, 'jest.config.ts'))?.includes('collectCoverage')
    || JSON.stringify(pkg?.jest ?? {}).includes('coverage');
  criteria.push({
    id: 'coverage',
    description: 'Configuração de cobertura (script ou jest.config)',
    weight: 2,
    earned: hasCoverageScript || coverageInConfig ? 2 : 0,
    publicNote: hasCoverageScript ? 'Script com --coverage detectado' : coverageInConfig ? 'cobertura no config' : 'Nenhum',
  });

  // Critério 4: teste de TELA (RNTL) — render + fireEvent/screen
  const hasScreenTest = testFiles.some((f) => {
    const src = readFileSafe(f) ?? '';
    const usesRNTL = src.includes('@testing-library/react-native');
    const rendersAndInteracts = /\brender\s*\(/.test(src) && (/\bfireEvent\b/.test(src) || /\bscreen\b/.test(src) || /getByText|getByRole|getByTestId/.test(src));
    return usesRNTL && rendersAndInteracts;
  });
  criteria.push({
    id: 'screen-test',
    description: 'Teste de tela RNTL (render + interação/query)',
    weight: 2,
    earned: hasScreenTest ? 2 : 0,
    publicNote: hasScreenTest ? 'Teste de tela RNTL detectado' : 'Nenhum teste com render() + RNTL',
  });

  // Critério 5: README
  const readme = findReadme(args.entrega);
  criteria.push({
    id: 'readme',
    description: 'README com comandos de execução',
    weight: 1,
    earned: readme ? 1 : 0,
    publicNote: readme ? 'README encontrado' : 'README ausente',
  });

  const { total, score } = computeScore(criteria);
  const minimo = passThreshold(total, 60);
  const { publicBreakdown, privateBreakdown } = buildBreakdowns(criteria);

  const result: GradeResult = {
    atividade: 'TAM-A2-Unit-RNTL',
    total,
    score: +score.toFixed(2),
    minimo,
    pass: score >= minimo,
    criteria,
    publicBreakdown,
    privateBreakdown,
    metadata: {
      studentLogin: args.studentLogin,
      entregaPath: args.entrega,
      timestamp: new Date().toISOString(),
      commitSha: args.commitSha,
    },
  };

  writeFileSync(args.output, JSON.stringify(result, null, 2));
  console.log(`Grade: ${result.score}/${result.total} (min ${result.minimo}) — ${result.pass ? 'PASS' : 'FAIL'}`);
  process.exit(result.pass ? 0 : 1);
}

main().catch((e) => {
  console.error('Validator error:', e);
  process.exit(2);
});
