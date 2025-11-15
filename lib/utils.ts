import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import React from 'react'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Redimensiona e comprime uma imagem para reduzir seu tamanho
 * @param file Arquivo de imagem original
 * @param maxWidth Largura máxima da imagem redimensionada (padrão: 1920px)
 * @param quality Qualidade da compressão (0-1, padrão: 0.8)
 * @returns Promise com o arquivo comprimido
 */
export const compressImage = async (
  file: File,
  maxWidth: number = 1920,
  quality: number = 0.85
): Promise<File> => {
  return new Promise((resolve, reject) => {
    // Se o arquivo já é pequeno (< 500KB), não precisa comprimir
    if (file.size < 500 * 1024) {
      resolve(file);
      return;
    }
    
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const img = new Image();
      
      img.onload = () => {
        // Calcular dimensões mantendo proporção
        let width = img.width;
        let height = img.height;
        
        // Redimensionar apenas se for maior que maxWidth
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        // Criar canvas para redimensionar com melhor qualidade
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        
        // Desenhar imagem redimensionada com alta qualidade
        const ctx = canvas.getContext('2d', { 
          alpha: true,
          desynchronized: false,
          willReadFrequently: false
        });
        if (!ctx) {
          reject(new Error('Não foi possível obter contexto do canvas'));
          return;
        }
        
        // Melhorar qualidade de renderização
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        ctx.drawImage(img, 0, 0, width, height);
        
        // Determinar o tipo de saída (manter PNG para PNGs, JPEG para outros)
        // Para melhor compressão, converter PNGs grandes para JPEG
        const isPNG = file.type === 'image/png';
        const shouldConvertToJPEG = isPNG && file.size > 1000 * 1024; // PNGs > 1MB
        const outputType = shouldConvertToJPEG ? 'image/jpeg' : (isPNG ? 'image/png' : 'image/jpeg');
        
        // Converter para blob com qualidade otimizada
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Falha ao comprimir imagem'));
              return;
            }
            
            // Criar novo arquivo com nome otimizado
            const fileName = file.name.replace(/\.[^/.]+$/, '') + (shouldConvertToJPEG ? '.jpg' : file.name.match(/\.[^/.]+$/)?.[0] || '.jpg');
            const compressedFile = new File(
              [blob], 
              fileName, 
              { type: outputType }
            );
            
            resolve(compressedFile);
          },
          outputType,
          quality
        );
      };
      
      img.onerror = () => {
        reject(new Error('Erro ao carregar imagem'));
      };
      
      img.src = event.target?.result as string;
    };
    
    reader.onerror = () => {
      reject(new Error('Erro ao ler arquivo'));
    };
    
    reader.readAsDataURL(file);
  });
};

/**
 * Comprime múltiplas imagens em paralelo
 * @param files Array de arquivos de imagem
 * @param maxWidth Largura máxima das imagens
 * @param quality Qualidade da compressão (0-1)
 * @param onProgress Callback para monitorar o progresso (0-100)
 * @returns Array de arquivos comprimidos
 */
export const compressImages = async (
  files: File[], 
  maxWidth: number = 1920, 
  quality: number = 0.8,
  onProgress?: (progress: number) => void
): Promise<File[]> => {
  if (!files.length) return [];
  
  const compressedFiles: File[] = [];
  let completed = 0;
  
  // Processar cada arquivo sequencialmente para melhor controle
  for (const file of files) {
    const compressedFile = await compressImage(file, maxWidth, quality);
    compressedFiles.push(compressedFile);
    
    // Atualizar progresso
    completed++;
    if (onProgress) {
      const progress = Math.round((completed / files.length) * 100);
      onProgress(progress);
    }
  }
  
  return compressedFiles;
};

// Formatar valor para moeda (EUR)
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR'
  }).format(value);
};

// Calcular número de dias entre duas datas (para estadias)
export const calcStayDays = (checkIn: string | Date | null, checkOut: string | Date | null): number => {
  if (!checkIn || !checkOut) return 0;
  
  const start = typeof checkIn === 'string' ? new Date(checkIn) : checkIn;
  const end = typeof checkOut === 'string' ? new Date(checkOut) : checkOut;
  
  // Diferença em milissegundos
  const diffTime = Math.abs(end.getTime() - start.getTime());
  // Converter para dias
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};
