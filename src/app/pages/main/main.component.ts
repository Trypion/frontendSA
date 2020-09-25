import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { ItensService } from '../../services/itens.service';
import { Item } from '../../services/item.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  constructor(public auth: AuthService, private itensService: ItensService) {}

  dataSource: MatTableDataSource<Item>;
  // itens: Item[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [
    'id',
    'nome',
    'perfil',
    'gps',
    'validade',
    'email_op',
  ];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.itensService.getItens().subscribe(async (itens: Item[]) => {
      await itens.map((item, index) => {
        this.itensService.reverseGeocode(item.gps).subscribe((response) => {
          itens[index].gps = response.display_name;
        });
      });
      this.dataSource = new MatTableDataSource(itens);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    // this.itensService.reverseGeocode().subscribe((response)=>{
    //   // console.log(response);
    // })
  }
}
