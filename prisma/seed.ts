import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  /**
   * Load data
   */
  const hardSkills: Array<Prisma.HardSkillCreateManyInput> = [
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
  ];
  const softSkills: Array<Prisma.SoftSkillCreateManyInput> = [
    {
      id: 'eee087a3-d6e7-4eb1-a062-8d26ac00e9ef',
      name: 'Comunicação',
      level: 'EXPERT',
      description:
        'A habilidade de dialogar com colegas de trabalho para evitar conflitos, resolver divergências e eliminar ruídos que prejudicam a realização de tarefas.',
    },
    {
      id: 'b446a0da-a82e-4c0a-9aa1-ebef0e45aca3',
      name: 'Liderança',
      level: 'ADVANCED',
      description:
        'A capacidade de inspirar funcionários e motivar equipes a entregar resultados, sabendo quando servir de exemplo, quando delegar tarefas e como cobrar desempenho sem constranger o time.',
    },
    {
      id: '0524e7fc-d594-437d-899a-b3e059d46b39',
      name: 'Criatividade',
      level: 'UPPER_INTERMEDIATE',
      description:
        'Tem a ver com a capacidade de inovação, de pensar fora do status quo e de apresentar soluções diferentes para problemas antigos, de maneira diferente do padrão.',
    },
    {
      id: '079ebf9f-476f-4a3e-b459-bf6aa8474429',
      name: 'Proatividade',
      level: 'INTERMEDIATE',
      description:
        'Capacidade de arregaçar as mangas, avaliar cenários e encontrar caminhos para resolver questões que impedem os resultados ou atrapalham a produtividade.',
    },
  ];

  /**
   * Init transactions
   */
  await prisma.hardSkill.createMany({
    data: hardSkills,
    skipDuplicates: true,
  });
  await prisma.softSkill.createMany({
    data: softSkills,
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
