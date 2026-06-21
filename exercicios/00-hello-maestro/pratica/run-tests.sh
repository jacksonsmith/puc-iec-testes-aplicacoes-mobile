#!/bin/bash
set -e

echo "=== Instalando Fossify Calculator ==="
CALC_URL=$(gh api repos/FossifyOrg/fossify-calculator/releases/latest \
  --jq '[.assets[] | select(.name | endswith(".apk"))] | .[0].browser_download_url' 2>/dev/null || echo "")

if [ -z "$CALC_URL" ]; then
  echo "Fossify nao encontrado, tentando SimpleMobileTools..."
  CALC_URL=$(gh api repos/SimpleMobileTools/Simple-Calculator/releases/latest \
    --jq '[.assets[] | select(.name | endswith(".apk"))] | .[0].browser_download_url' 2>/dev/null || echo "")
fi

if [ -n "$CALC_URL" ]; then
  echo "Baixando: $CALC_URL"
  curl -sL "$CALC_URL" -o /tmp/calc.apk
  adb install /tmp/calc.apk
  echo "Calculadora instalada."
else
  echo "ERRO: nao foi possivel baixar a calculadora" && exit 1
fi

echo ""
echo "=== Rodando Maestro ==="
maestro test exercicios/00-hello-maestro/pratica/flows/ --format junit --output results.xml
