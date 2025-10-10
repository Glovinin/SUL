#!/bin/bash

# Script para otimizar imagens da equipe
# Reduz o tamanho dos arquivos mantendo a qualidade

echo "🖼️  Team Photos Optimization"
echo "============================"
echo ""

TEAM_DIR="public/images/team"

# Verificar se a pasta existe
if [ ! -d "$TEAM_DIR" ]; then
    echo "❌ Pasta $TEAM_DIR não encontrada!"
    exit 1
fi

echo "📁 Otimizando fotos em: $TEAM_DIR/"
echo ""

# Contar arquivos
count=$(find "$TEAM_DIR" -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" | wc -l)
echo "📊 $count fotos encontradas"
echo ""

# Mostrar tamanhos atuais
echo "📏 Tamanhos atuais:"
find "$TEAM_DIR" -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" | while read file; do
    size=$(du -h "$file" | cut -f1)
    echo "   $(basename "$file"): $size"
done

echo ""
echo "💡 Dicas para otimização:"
echo "   1. Use ferramentas online como TinyPNG.com"
echo "   2. Redimensione para 800x1200px (proporção 2:3)"
echo "   3. Comprima para ~200-400KB por foto"
echo "   4. Mantenha formato PNG para transparência"
echo ""

# Calcular tamanho total
total_size=$(du -sh "$TEAM_DIR" | cut -f1)
echo "📦 Tamanho total da pasta: $total_size"
echo ""

echo "🚀 Para otimizar automaticamente (se tiver ImageMagick):"
echo "   find $TEAM_DIR -name '*.png' -exec convert {} -resize 800x1200^ -gravity center -extent 800x1200 -quality 85 {} \;"
echo ""
echo "✨ Ou use: https://tinypng.com para otimização online"


