import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const data: Array<Prisma.SoftSkillCreateManyInput> = [
    {
      id: 'a7fefc11-bdc0-48d5-922c-031309cb60bf',
      name: 'HTML, CSS e Javascript',
      level: 'BEGGINER',
      description: 'Webdesign Front-end Fundamentos: HTML, CSS, Lógica de programação e Javascript.',
    },
    {
      id: 'c19fd329-d563-4f83-ade4-f86b10937364',
      name: 'TypeScript',
      level: 'INTERMEDIATE',
      description:
        'TypeScript é um superconjunto do JavaScript que adiciona recursos de tipagem estática, trazendo mais robustez e segurança ao desenvolvimento de código.',
    },
    {
      id: '718b96af-ca5e-4908-9d85-441e8ff84f09',
      name: 'Java',
      level: 'ADVANCED',
      description:
        'Java é uma linguagem de programação versátil, orientada a objetos e de propósito geral, utilizada para desenvolver uma ampla variedade de aplicativos, desde aplicativos móveis até sistemas distribuídos em larga escala.',
    },
    {
      id: '39f8b1b8-c027-472e-9928-23333f92dde0',
      name: 'Python',
      level: 'UPPER_INTERMEDIATE',
      description:
        'Python é uma linguagem de programação poderosa e fácil de aprender, conhecida por sua simplicidade e legibilidade, sendo amplamente utilizada em diversas áreas, desde desenvolvimento web até análise de dados.',
    },
    {
      id: 'eee087a3-d6e7-4eb1-a062-8d26ac00e9ef',
      name: 'Dart',
      level: 'EXPERT',
      description:
        'Dart é uma linguagem de programação desenvolvida pela Google, que permite escrever código de forma eficiente e escalável para desenvolvimento web, aplicativos móveis e até mesmo para criação de aplicações de inteligência artificial.',
    },
    {
      id: 'b446a0da-a82e-4c0a-9aa1-ebef0e45aca3',
      name: 'Cloud AWS',
      level: 'ADVANCED',
      description:
        'AWS (Amazon Web Services) é uma plataforma de computação em nuvem que oferece uma ampla gama de serviços, como armazenamento, computação, bancos de dados e inteligência artificial, permitindo às empresas escalabilidade, flexibilidade e segurança para hospedar seus aplicativos e armazenar seus dados na nuvem.',
    },
    {
      id: '0524e7fc-d594-437d-899a-b3e059d46b39',
      name: 'Segurança da informação',
      level: 'UPPER_INTERMEDIATE',
      description:
        'Segurança da informação é um conjunto de medidas e práticas voltadas para proteger as informações, sistemas e redes de uma organização, garantindo sua confidencialidade, integridade e disponibilidade contra ameaças internas e externas.',
    },
    {
      id: '079ebf9f-476f-4a3e-b459-bf6aa8474429',
      name: 'Go',
      level: 'INTERMEDIATE',
      description:
        'Go (também conhecida como Golang) é uma linguagem de programação open source desenvolvida pela Google, conhecida por sua simplicidade, eficiência e suporte à concorrência, sendo amplamente utilizada no desenvolvimento de aplicativos web e sistemas distribuídos.',
    },
  ];

  await prisma.softSkill.createMany({
    data,
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
