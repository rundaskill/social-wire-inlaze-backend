import { Mensaje } from 'src/app/mensajes/entities/mensaje.entity';
import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn,Index ,UpdateDateColumn, DeleteDateColumn, OneToMany} from 'typeorm';
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    user: string;

    @Column()
    name: string;
  
    @Column({unique:true})
    email: string;
  
    @Column()
    password?: string;

    @CreateDateColumn({ type: 'timestamp' })
    creado_at: Date;

    @UpdateDateColumn({ select: false })
    updated_at: Date;

    @DeleteDateColumn({ select: false })
    deleted_at: Date;
    @OneToMany(() => Mensaje, (mensaje) => mensaje.user)
    mensaje: Mensaje[]
}

