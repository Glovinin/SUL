#!/bin/bash

# Script para atualizar links do LinkedIn da equipe
# Uso: ./scripts/update-linkedin-links.sh

echo "🔗 LinkedIn Links Update Helper"
echo "==============================="
echo ""

TEAM_FILE="lib/team-data.ts"

# Verificar se o arquivo existe
if [ ! -f "$TEAM_FILE" ]; then
    echo "❌ Arquivo $TEAM_FILE não encontrado!"
    exit 1
fi

echo "📁 Arquivo: $TEAM_FILE"
echo ""

# Mostrar membros atuais
echo "👥 Membros da equipe atuais:"
echo ""
grep -A 3 "name:" "$TEAM_FILE" | grep -E "(name:|link:)" | while read line; do
    if [[ $line == *"name:"* ]]; then
        name=$(echo "$line" | sed 's/.*name: "//' | sed 's/",//')
        echo "   📋 $name"
    elif [[ $line == *"link:"* ]]; then
        link=$(echo "$line" | sed 's/.*link: "//' | sed 's/",//')
        echo "      🔗 $link"
        echo ""
    fi
done

echo ""
echo "📝 Para atualizar links individuais:"
echo "   1. Edite o arquivo lib/team-data.ts"
echo "   2. Substitua 'https://linkedin.com' pelo perfil específico"
echo "   3. Formato: 'https://linkedin.com/in/nome-sobrenome'"
echo ""

echo "💡 Exemplo de atualização:"
echo "   Antes: link: \"https://linkedin.com\""
echo "   Depois: link: \"https://linkedin.com/in/diego-rocha\""
echo ""

echo "🚀 Links atuais apontam para: https://linkedin.com"
echo "   (Página principal do LinkedIn)"
echo ""

# Contar quantos links precisam ser atualizados
count=$(grep -c "https://linkedin.com\"," "$TEAM_FILE")
echo "📊 $count membros com links genéricos para atualizar"




