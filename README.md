# crud_tarefas

Um **crud de tasks do zero em Node.js**.  
O projeto foi criado combase de montar um crud basico usando javacrispt e node.

## 🧰 Stack utilizada
- Node.js
- JavaScript 

## 📦 Instalação
```bash
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
npm install
node src/server.js
```

Servidor: http://localhost:4444

## 🔌 Como testar a API

Você pode usar:

Insomnia

Postman

curl

Thunder Client


Criar uma Tarefa

POST http://localhost:4444/tasks
Content-Type: application/json

{
	"title": "Arrumar Quarto",
	"subtitle": "Casa"
}

Listar Tarefas

GET http://localhost:4444/tasks

[
	{
		"id": "96aa406a-033d-448a-9e0e-026b38b5ae47",
		"title": "Arrumar Quarto",
		"subtitle": "Casa",
		"status": "pending",
		"created_at": "2026-02-17T22:14:12.074Z",
		"updated_at": "2026-02-17T22:14:12.074Z"
	}
]

Deletar a task

DEL http://localhost:4444/tasks/:id

Atualizar o titulo e subtitulo da task

http://localhost:4444/tasks/:id/

{
	"title": "Arrumar cama",
	"subtitle": "quarto"
}

Mudar Status

PATCH http://localhost:4444/tasks/:id/complete

## 🛣️ Sistema de Rotas

As rotas são definidas como objetos:
```bash
{
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { title, subtitle } = req.body;
            const task = {
                id: randomUUID(),
                title,
                subtitle,
                status: "pending",
                created_at: new Date(),
                updated_at: new Date()
            }
            database.insert('tasks', task);
            return res.writeHead(201).end();
        }
},
```

## 🔧 Middleware de JSON

O projeto implementa seu próprio parser de JSON, lendo o body como stream:
```bash
for await (const chunk of req) {
  buffers.push(chunk)
}

req.body = JSON.parse(Buffer.concat(buffers).toString())
```

  ## 🧠 Curiosidades técnicas

O sistema de rotas usa Regex para interpretar URLs com parâmetros (:id)

## 🎯 Objetivo do projeto

Montar um crud funcional simples.

Criar uma base sólida de backend e suas atribuições.
