#!/bin/bash

# Script para facilitar upload de fotos da equipe
# Uso: ./scripts/upload-team-photos.sh

echo "📸 Team Photos Upload Helper"
echo "============================="
echo ""

# Verificar se a pasta existe
if [ ! -d "public/images/team" ]; then
    echo "❌ Pasta public/images/team não encontrada!"
    exit 1
fi

echo "📁 Pasta de destino: public/images/team/"
echo ""

# Listar arquivos existentes
echo "📋 Fotos atuais na pasta:"
ls -la public/images/team/*.{jpg,jpeg,png} 2>/dev/null || echo "   (nenhuma foto encontrada)"
echo ""

# Instruções
echo "📝 Para adicionar suas fotos:"
echo "1. Salve suas fotos na pasta public/images/team/"
echo "2. Use os seguintes nomes de arquivo:"
echo ""
echo "   bruno-santos.jpg    - Bruno Santos (CTO & Co-founder)"
echo "   maria-silva.jpg     - Maria Silva (Chief AI Scientist)"
echo "   joao-costa.jpg      - João Costa (Blockchain Lead)"
echo "   ana-rodrigues.jpg   - Ana Rodrigues (Data Scientist)"
echo "   carlos-mendes.jpg   - Carlos Mendes (ESG Specialist)"
echo "   sofia-almeida.jpg   - Sofia Almeida (Product Designer)"
echo ""
echo "3. Edite o arquivo lib/team-data.ts para atualizar nomes e informações"
echo ""

# Verificar se há arquivos
count=$(find public/images/team -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" | wc -l)
echo "✅ $count fotos encontradas na pasta team"
echo ""

if [ $count -gt 0 ]; then
    echo "🔍 Fotos encontradas:"
    find public/images/team -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" | while read file; do
        echo "   - $(basename "$file")"
    done
fi

echo ""
echo "🚀 Próximos passos:"
echo "   1. Adicione suas fotos na pasta public/images/team/"
echo "   2. Edite lib/team-data.ts com as informações corretas"
echo "   3. Execute 'npm run dev' para ver as mudanças"
echo ""
echo "💡 Dica: Use ferramentas online como TinyPNG para otimizar as fotos antes do upload"
