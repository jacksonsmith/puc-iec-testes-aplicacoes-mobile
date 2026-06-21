#!/bin/bash
set -e

echo "=== Pacotes instalados ==="
adb shell pm list packages | sort | tee installed-packages.txt

echo ""
echo "=== Apps de calculadora ==="
grep -i "calc" installed-packages.txt || echo "(nenhum calculator encontrado)"

echo ""
echo "=== Rodando Maestro ==="
maestro test exercicios/00-hello-maestro/pratica/flows/ --format junit --output results.xml
