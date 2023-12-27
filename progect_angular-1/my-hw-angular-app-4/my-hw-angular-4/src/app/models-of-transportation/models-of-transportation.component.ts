import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { VehicleItem, cars, planes, ships } from '../mock-ModelsOfTransportation-desc';

@Component({
  selector: 'app-models-of-transportation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './models-of-transportation.component.html',
  styleUrl: './models-of-transportation.component.css'
})



export class ModelsOfTransportationComponent {
  cars = cars;
  planes = planes;
  ships = ships;

  largestVehicleInfo: VehicleItem | undefined;

  ShowInfo(vehicleType: string): void {
    let vehicles: VehicleItem[] = [];

    switch (vehicleType) {
      case 'car':
        vehicles = this.cars;
        break;
      case 'plane':
        vehicles = this.planes;
        break;
      case 'ship':
        vehicles = this.ships;
        break;
      default:
        break;
    }

    this.largestVehicleInfo = this.findLargestVehicle(vehicles);
  }

  private findLargestVehicle(vehicles: VehicleItem[]): VehicleItem | undefined {
    if (vehicles.length === 0) {
      return undefined;
    }
  
    return vehicles.reduce((prev: VehicleItem | undefined, current: VehicleItem) => {
      if (!prev) {
        return current;
      }
      return prev.size > current.size ? prev : current;
    }, undefined);
  }
  
}


