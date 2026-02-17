import { Database } from './database.js';
import { randomUUID } from 'node:crypto';
import { buildRoutePath } from './utils/build-route-path.js';

const database = new Database();

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { search } = req.query

            const tasks = database.select('tasks', search ?
                {
                    title: search,
                    subtitle: search
                } : null);

            return res.end(JSON.stringify(tasks));
        }
    },
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
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params;
            const { title, subtitle } = req.body;

            database.update('tasks', id, { title, subtitle });

            return res.writeHead(204).end();
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params;
            database.delete('tasks', id);

            return res.writeHead(204).end();
        }
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: (req, res) => {
            const { id } = req.params;

            const tasks = database.select('tasks');
            const task = tasks.find(task => task.id === id);

            if (!task) {
                return res.writeHead(404).end();
            }
            
            const newStatus =
            task.status === "completed"
                ? "pending"
                : "completed";

            database.update('tasks', id, {
                status: newStatus,
                updated_at: new Date()
            });

            return res.writeHead(204).end();
        }
    },
]