import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import  { Subscription } from 'rxjs'

@Component({
  selector: 'app-filters',
  templateUrl: './filters.components.html'
})
export class FiltersComponent implements OnInit, OnDestroy {

  @Output() showCategory = new EventEmitter<string>();
  categoriesSubscription: Subscription | undefined;
  categories: string[] | undefined;

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.categoriesSubscription = this.storeService.getAllCategories()
    .subscribe((response: Array<string>) =>{
    this.categories = response;
    });
    } 

  onShowCategory(category:string):void {
    this.showCategory.emit(category);
  }

  ngOnDestroy(): void{
    if(this.categoriesSubscription){
      this.categoriesSubscription.unsubscribe();
    }
  }

}
