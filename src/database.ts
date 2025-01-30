import pg from 'pg';

export class Database {
    private client: pg.Client;

    constructor() {
        this.client = new pg.Client({
            user: 'postgres',
            host: 'localhost',
            database: 'taskflow',
            password: '123',
            port: 5432,
        })
        this.client.connect();
    }

    
    public async getItems():Promise<any[]> {
        const result = await this.client.query(
            'SELECT * from items ORDER BY id ASC'
        );
        return result.rows
    }


    public async addItem(title: string): Promise<void> {
        await this.client.query("INSERT INTO items (title) VALUES ($1)",[title]);
    }


    public async editItem( id: number, title:string ): Promise<void> {
        await this.client.query('UPDATE items SET title = $1 WHERE id = $2', [title, id]);
    }


    public async deleteItem(id: number):Promise<void> {
        await this.client.query('DELETE FROM items WHERE id = $1', [id]);
    }
}