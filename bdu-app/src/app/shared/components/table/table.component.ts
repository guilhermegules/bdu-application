import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true,
  imports: [CommonModule, MatTableModule],
})
export class TableComponent {
  @Input()
  public dataSource: unknown[] = [];

  @Input()
  public headerData: Record<string, string> = {};

  @Input()
  public displayedColumns: string[] = [];

  @Input()
  public formatters: Record<string, (row: string | number) => string> = {};
}
