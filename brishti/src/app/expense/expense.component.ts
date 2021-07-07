import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
enum viewType {
    Add = "add",
    View = "view"
}

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

    viewTypes = viewType;
    selectedView: viewType;

    currDate  =new Date();
    expenseList: string[];


    amountPaid: number;
    selectedExpense: string;
    paidBy: string;
    selectedDate: string;
    paymentType: string;
    description: string;

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.selectedView = viewType.View;

        this.expenseList = ["brooklake", "Fine Art Production", "Mughal Food", "Diwaan", "Sunny Dj", "Florista Decor"];
        this.selectedExpense = "";
        this.paidBy = "";
        this.paymentType = "";
        this.description = "";

        this.getExpenses()
    }

    viewChanged(view){
        this.selectedView = view;
    }

    paidAmoundChanged(amount){
        amount = amount ? amount === "" ? 0: amount: 0;
        this.amountPaid = amount;
        console.log(this.amountPaid);
        
    }

    expenseChanged(item) {
        this.selectedExpense = item;
        console.log(this.selectedExpense)
    }

    paidByChanged(payBy){
        this.paidBy = payBy;
        console.log(this.paidBy)
    }

    dateChanged(date){
        this.selectedDate = date;
        console.log(this.selectedDate)
    }

    paymentTypeChanged(text) {
        this.paymentType = text;
    }

    descriptionChanged(text) {
        this.description = text;
    }

    getExpenses() {

    }

    submitExpense(){
        
    }
}
