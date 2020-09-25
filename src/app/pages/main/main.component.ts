import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { ItensService } from '../../services/itens.service';
import { Item } from '../../services/item.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  constructor(public auth: AuthService, private itensService: ItensService) {

  }

  //  item2: Item = {
  //   id: 123,
  //   nome: "fdfda",
  //   perfil: "fdfdsf",
  //   gps: "fdsfsd",
  //   validade: "fdsfds",
  //   email_op: "fdsfsdfds",
  // }

  dataSource: any;
  itens: Item[];

  getItens() {
    this.itensService.getItens().subscribe((itens: Item[]) => {
      this.itens = itens;
      console.log(this.itens);
    });
  }

  displayedColumns: string[] = [
    'id',
    'nome',
    'perfil',
    'gps',
    'validade',
    'email_op',
  ];
  // dataSource = new MatTableDataSource(this.itens);
  // dataSource = new MatTableDataSource(this.itensService.getItens();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.itensService.getItens().subscribe((itens: Item[]) => {
      console.log(itens)
      this.dataSource = new MatTableDataSource(itens);
      console.log(itens)
    });
  }
}
