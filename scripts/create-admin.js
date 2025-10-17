#!/usr/bin/env node

/**
 * Script para criar Admin no Firebase
 * 
 * USO:
 * node scripts/create-admin.js
 * 
 * Ou com argumentos:
 * node scripts/create-admin.js admin@greencheck.pt MyPassword123! "Admin Name"
 */

const readline = require('readline');

// Verificar se está rodando no ambiente correto
if (typeof window !== 'undefined') {
  console.error('❌ Este script deve ser executado no Node.js, não no browser!');
  process.exit(1);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function main() {
  console.log('\n🔐 Greencheck Admin Creator\n');
  console.log('Este script criará um admin no Firebase usando o Admin SDK.\n');
  console.log('⚠️  AVISO: Este script requer Firebase Admin SDK e Service Account Key.');
  console.log('⚠️  Para uso simples, use o Firebase Console (veja ADMIN_SETUP_GUIDE.md).\n');

  // Pegar argumentos ou pedir input
  let email = process.argv[2];
  let password = process.argv[3];
  let name = process.argv[4];

  if (!email) {
    email = await question('📧 Email do admin (ex: admin@greencheck.pt): ');
  }

  if (!password) {
    password = await question('🔑 Senha (mínimo 6 caracteres): ');
  }

  if (!name) {
    name = await question('👤 Nome do admin (ex: Admin Greencheck): ');
  }

  console.log('\n📋 Dados do admin:');
  console.log('Email:', email);
  console.log('Password:', '*'.repeat(password.length));
  console.log('Name:', name);

  const confirm = await question('\n✅ Confirmar criação? (y/n): ');

  if (confirm.toLowerCase() !== 'y' && confirm.toLowerCase() !== 'yes') {
    console.log('❌ Cancelado.');
    rl.close();
    process.exit(0);
  }

  console.log('\n🚀 Criando admin...\n');

  try {
    // Importar Firebase Admin SDK
    const admin = require('firebase-admin');

    // Verificar se já foi inicializado
    if (!admin.apps.length) {
      // Tentar carregar service account key
      let serviceAccount;
      
      try {
        serviceAccount = require('../serviceAccountKey.json');
      } catch (err) {
        console.error('❌ Erro: Arquivo serviceAccountKey.json não encontrado!');
        console.log('\n📝 Como obter o Service Account Key:');
        console.log('1. Vá em Firebase Console → Project Settings → Service Accounts');
        console.log('2. Clique em "Generate new private key"');
        console.log('3. Salve o arquivo como serviceAccountKey.json na raiz do projeto');
        console.log('4. Execute este script novamente\n');
        rl.close();
        process.exit(1);
      }

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
    }

    const db = admin.firestore();

    // 1. Criar usuário no Firebase Auth
    console.log('1/3 Criando usuário no Firebase Auth...');
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
      emailVerified: true,
      displayName: name
    });

    console.log('✅ Usuário criado!');
    console.log('   UID:', userRecord.uid);

    // 2. Adicionar documento no Firestore
    console.log('\n2/3 Criando documento no Firestore (admins collection)...');
    await db.collection('admins').doc(userRecord.uid).set({
      uid: userRecord.uid,
      email: email,
      name: name,
      role: 'admin',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      createdBy: 'script'
    });

    console.log('✅ Documento criado no Firestore!');

    // 3. Verificar se foi criado corretamente
    console.log('\n3/3 Verificando...');
    const adminDoc = await db.collection('admins').doc(userRecord.uid).get();
    
    if (adminDoc.exists && adminDoc.data().role === 'admin') {
      console.log('✅ Verificação OK!\n');
      
      console.log('═══════════════════════════════════════════════════════');
      console.log('🎉 ADMIN CRIADO COM SUCESSO!');
      console.log('═══════════════════════════════════════════════════════\n');
      console.log('📧 Email:', email);
      console.log('🔑 Password:', password);
      console.log('🆔 UID:', userRecord.uid);
      console.log('\n📍 Acesse o painel admin em:');
      console.log('   Local: http://localhost:5000/admin/login');
      console.log('   Prod:  https://seu-dominio.replit.dev/admin/login\n');
      console.log('═══════════════════════════════════════════════════════\n');
    } else {
      console.log('⚠️  Admin criado mas verificação falhou. Verifique manualmente no Firebase Console.');
    }

  } catch (error) {
    console.error('\n❌ ERRO:', error.message);
    
    if (error.code === 'auth/email-already-exists') {
      console.log('\n⚠️  Este email já está em uso!');
      console.log('Soluções:');
      console.log('1. Use outro email');
      console.log('2. Delete o usuário existente no Firebase Console → Authentication');
      console.log('3. Adicione manualmente o documento em Firestore (veja ADMIN_SETUP_GUIDE.md)');
    }
    
    if (error.code === 'MODULE_NOT_FOUND') {
      console.log('\n📦 Instale o Firebase Admin SDK:');
      console.log('npm install firebase-admin');
    }
  }

  rl.close();
}

// Executar
main().catch(err => {
  console.error('Erro fatal:', err);
  rl.close();
  process.exit(1);
});










