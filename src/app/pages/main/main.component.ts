import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { ItensService } from '../../services/itens.service';
import { Item } from '../../services/item.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, map } from 'rxjs/operators';

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class MainComponent implements OnInit {
  apiLoaded: Observable<boolean>;

  //google maps
  center: google.maps.LatLngLiteral = {lat: -27.595, lng: -48.555};
  zoom = 10;
  markerOptions: google.maps.MarkerOptions = {draggable: true};
  markerPosition: google.maps.LatLngLiteral;

  addMarker(event: google.maps.MouseEvent) {
    this.markerPosition = event.latLng.toJSON();
  }

  constructor(public auth: AuthService, private itensService: ItensService, private httpClient: HttpClient) {


    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyCAYZHrw8_gPd2TyoojlzKKAsfpMGhP6hk', 'callback')
        .pipe(
          map(() => true),
          catchError(() => of(false)),
        );
  }

  // dataSource2 = ELEMENT_DATA;
  expandedElement: PeriodicElement | null;

  isLoadingResults = true;
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

  columnsToDisplay = this.displayedColumns;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.itensService.getItens().subscribe((itens: Item[]) => {
      itens.map((item, index) => {
        this.itensService.reverseGeocode(item.gps).subscribe((response) => {
          itens[index].gps = response.display_name;
          this.isLoadingResults = false;
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

export interface PeriodicElement {
  id: string;
  nome: string;
  perfil: string;
  gps: string;
  validade: string;
  email_op: string;
}
