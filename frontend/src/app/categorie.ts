import { Todo_list } from "./todo_list";
import { User } from "./user";

export class Categorie{
    id: number;
    nom_categorie: string;
    user:User
    todo_lists: Todo_list
    
}