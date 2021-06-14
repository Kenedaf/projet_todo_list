import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuard } from '../auth-guard.service';
import { AuthService } from '../auth.service';
import { Categorie } from '../categorie';
import { CategorieService } from '../categorie.service';
import { TodoListService } from '../todo-list.service';
import { Todo_list } from '../todo_list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  constructor(
    private todo_fb: FormBuilder,
    private todo_fbmc :FormBuilder,
    private categorie_fb:FormBuilder,
    private todo_fbm : FormBuilder,
    private todo_list: TodoListService,
    private categorie: CategorieService,
    private authService : AuthService,
    private router :Router,
    private authguards: AuthGuard

  ) { }
  todo_form: FormGroup
  categorie_form_modif :FormGroup
  todo_form_modif :FormGroup
  categorie_form :FormGroup
  submitted=false
  categories:Categorie[]=[]
  todo_lists: Observable <Todo_list[]>
  categorie_id=0
  selectedTache:any
  selectedCategorie:any
  variable_user :any
  @Input() tache_by_id :Todo_list
  @Input() categorie_by_id :Categorie
  ngOnInit(): void {
    this.initForm_todo()
    this.initForm_todo_modif()
    this.initFormCategorie()
    this.initForm_categorie_modif()
    this.variable_user= this.authguards.currentUser.username
    this.Read_Todo_list()
    this.categorie_id=0
    this.ReadCategorie()
   

  }
  ReadCategorie()
  {
    this.categorie.GetCategorieList(this.variable_user).subscribe(categories => this.categories = categories)
  }
  Read_Todo_list()
{
  this.todo_lists=this.todo_list.GetTodo_list_List()
}
  refresh(): void {
    window.location.reload();
    }
    updateProfile(e) {
      this.todo_form.get('categorie_id').setValue(e, {
        onlySelf: true
      })
    }
///////////////////////////////////////////      Form Todo ADD        ///////////////////////////////////////////////

  initForm_todo()
  {
   this.todo_form= this.todo_fb.group({
     titre: [null,[Validators.required]],
     a_faire: [null,[Validators.required]],
     
   })
   return null;
 }
    get myForm()
    {
      return this.todo_form.controls;
    }
  //////////////////////////////          Form Todo Modification          //////////////////////////////////////////

    initForm_todo_modif()
    {
     this.todo_form_modif= this.todo_fbm.group({
       titre: [null,[Validators.required]],
       a_faire: [null,[Validators.required]],
     })
     return null;
   }
      get myFormmodif()
      {
        return this.todo_form.controls;
      }
      ///////////////////////////////       Form Modifier Catégorie    /////////////
      initForm_categorie_modif()
      {
       this.categorie_form_modif= this.todo_fbmc.group({
         nom_categorie: [null,[Validators.required]],
       })
       return null;
     }
        get myFormcatmod()
        {
          return this.categorie_form_modif.controls;
        }
      ////////////////////////////////          Form Categorie             ////////////////////////////////////////
      initFormCategorie()
      {
       this.categorie_form= this.categorie_fb.group({
         nom_categorie: [null,[Validators.required]],
       })
       return null;
     }
        get myFormcat()
        {
          return this.categorie_form.controls;
        }

    onChange(value)
    {
      this.categorie_id=value
      return this.categorie_id
    }
    onSelect(todo)
    {
     this.selectedTache=todo.id
    // this.i_selection= salarier.item
      this.GetTodo_list_by_id()
     return this.selectedTache
  
    }
    onSelect_1(categorie)
    {
     this.selectedCategorie=categorie.id
     this.GetCategorie_list_by_id()
     return this.selectedCategorie
  
    }
    ResetCat_id()
    {
      if(this.categorie_id ==0)
      {
        this.categorie_id=0
        return
      }
      if(this.categorie_id!=0)
      {
        this.categorie_id=0
        return
      }
      
      console.log('la categorie id ',this.categorie_id)
      return this.categorie_id
    }
Add_todo_list()
{

  this.submitted = true;
  if (!this.todo_form.valid) {
    return false;
  } else {
    if (this.categorie_id !== null)
    {
      this.todo_list.CreateTodo_list_with_categorie(this.todo_form.value,this.categorie_id)
      .subscribe(
        response => 

          {this.Read_Todo_list(),
            
            console.log(response)
            let currentUrl = this.router.url;
       this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
           this.router.navigate([currentUrl]);
       });
          },
        error=>  console.log(error))
  }
    
  
    else
    {
      this.todo_list.CreateTodo_list(this.todo_form.value, this.variable_user)
      .subscribe(
        response => 
          console.log(response),
        error=>  console.log(error))
    }
  }
    
}
Add_todo_list_2()
{
  this.submitted = true;
  if (!this.todo_form.valid) {
    return false;
  } else {
      this.todo_list.CreateTodo_list_with_categorie(this.todo_form.value,this.selectedCategorie)
      .subscribe(
        response => 

          {this.Read_Todo_list(),
            
            console.log(response)
            let currentUrl = this.router.url;
       this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
           this.router.navigate([currentUrl]);
       });
          },
        error=>  console.log(error))
  }
    
}
Update_Todo_list()
{
  //il faut récupérer l'id lors de la séléction de la todo list pour la modifier 
  this.submitted = true;
  if (!this.todo_form_modif.valid) {
    return false;
  } else {
    this.todo_list.UpdateTodo_list(this.selectedTache,this.todo_form_modif.value)
    .subscribe(
      response => 
       { console.log(response),
        this.Read_Todo_list()
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate([currentUrl]);
        });},
      error=>  console.log(error))}
}
GetTodo_list_by_id()
{
this.todo_list.GetTodo_list(this.selectedTache)
.subscribe(
 data=>{this.tache_by_id= data as Todo_list},
  error=>console.log(error)
)
}
GetCategorie_list_by_id()
{
this.categorie.GetCategorie_by_id(this.selectedCategorie)
.subscribe(
 data=>{this.categorie_by_id= data as Categorie
  console.log(this.selectedCategorie)
console.log('categporie bt id ',  this.categorie_by_id)},
  error=>console.log(error)
)
}

Delete_Todo_list()
{

    this.todo_list.DeleteTodo_list(this.selectedTache)
    .subscribe(
      response => 
      { console.log(response),
       this.Read_Todo_list()
       let currentUrl = this.router.url;
       this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
           this.router.navigate([currentUrl]);
       });},
     error=>  console.log(error))}



Add_categorie()
{
  let currentUrl
  this.submitted = true;
  if (!this.categorie_form.valid) {
    return false;
  } else {
      this.categorie.CreateCategorie(this.categorie_form.value,this.variable_user)
      .subscribe(
        response => 
          {console.log(response),
            this.ReadCategorie()
            let currentUrl = this.router.url;
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                this.router.navigate([currentUrl]);
            });
            
         },
        error=>  console.log(error))
  }
 
}
Modifier_Categorie()
{
    //il faut récupérer l'id lors de la séléction de la todo list pour la modifier 
    this.submitted = true;
    if (!this.categorie_form_modif.valid) {
      return false;
    } else {
      this.categorie.UpdateCategorie(this.selectedCategorie,this.categorie_form_modif.value)
      .subscribe(
        response => 
         { console.log(response),
          this.ReadCategorie()
          let currentUrl = this.router.url;
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
              this.router.navigate([currentUrl]);
          });},
        error=>  console.log(error))}
  

}
Delete_categorie()
{
this.categorie.DeleteCategorie(this.selectedCategorie)
.subscribe(
  response => 
    {console.log(response),
      this.ReadCategorie()
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
      });
      
   },
  error=>  console.log(error))
}
onLogout() {
  this.authService.logout();
  this.router.navigate([ '/auth/login']);
}
}
