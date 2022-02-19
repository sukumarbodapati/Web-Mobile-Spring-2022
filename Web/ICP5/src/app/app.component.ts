import { Component } from '@angular/core';
import { TDL } from 'src/Model/tdl';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
todoList = false;
counter = false;
  // define list of items
  tdls:TDL[]=[{
    name:"ICP Submission",
    completed:true,
},{
  name:"Groceries",
  completed:true,
},{
  name:"Travelling",
  completed:false,
},{
  name:"Shopping",
  completed:true,
},{
  name:"Meeting",
  completed:true,
}];
  newTd:string;
  
 

  // Write code to push new item
  submitNewItem() {
    if(this.newTd){
      let tdl=new TDL();
      tdl.name=this.newTd;
      tdl.completed=true;
      this.tdls.push(tdl);
      this.newTd=''

    }else{
      alert('Please enter a new todo value')
    }
  }

  // Write code to complete item
  completeItem(id:number) {
    this.tdls[id].completed=!this.tdls[id].completed;
  }

  // Write code to delete item
  deleteItem(id:number) {
    this.tdls=this.tdls.filter((v,i)=>i!==id)
  }

}
