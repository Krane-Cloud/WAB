import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationTree } from 'src/app/models/navigations';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-navigations-links',
  templateUrl: './navigations-links.component.html',
  styleUrls: ['./navigations-links.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]

})
export class NavigationsLinksComponent implements OnInit {
  expanded: boolean=false;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item!: NavigationTree;
  @Input() depth!: number;


  constructor(public navService: NavService,
                public router: Router) { 
      if (this.depth == undefined) {
        this.depth = 0;
      }
    }

    ngOnInit(): void {
      this.navService.currentUrl.subscribe((url: string) => {
        if (this.item.href && url) {
          this.expanded = url.indexOf(`/${this.item.href}`) === 0;
          this.ariaExpanded = this.expanded;
        }
      });
    }
    
    onItemSelected(item: NavigationTree) {
      if (!item.children || !item.children.length) {
        const data:Array<string>=[]
        if (item.baseref!=undefined && item.baseref!.length>0){
          item.baseref!.forEach((d:any)=>{
            data.push(d)
          })
        }
        if (item.href!=undefined && item.href!.length>0){
          item.href!.forEach((d:any)=>{
            data.push(d)
          })
        }
        // data.push(item.href!)
        this.expanded=true;
        this.navService.navigate2URL(data);
      }
      if (item.children && item.children.length) {
        this.expanded = !this.expanded;
      }
    }


}
