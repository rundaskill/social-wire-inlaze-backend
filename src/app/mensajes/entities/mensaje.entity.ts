import { User } from "src/app/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Mensaje {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    title:string;
    @Column()
    message: string

    @CreateDateColumn({ type: 'timestamp' })
    creado_at: Date;

    @UpdateDateColumn({ select: true })
    updated_at: Date;

    @DeleteDateColumn({ select: false })
    deleted_at: Date;

    @ManyToOne(() => User, (user) => user.id,{
        "nullable":false
    })
    user: User
}
