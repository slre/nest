import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Car } from './interfaces/car.interface';
import { AddCarDto,UpdateCarDto } from './dtos';
import { IsUUID } from 'class-validator';

@Injectable()
export class CarsService {
  private cars : Car[] = [
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: uuid(),
      brand: 'VW',
      model: 'Sirocco',
    },
    {
      id: uuid(),
      brand: 'Ford',
      model: 'Mustang',
    },
  ];
  findAll(){
    return this.cars;
  }
  findCarById( id : string){
    const res = this.cars.find(car =>  car.id === id);
    if( !res ){
        throw new NotFoundException(`Car with id:${id} not found`);
    }
    return  res ; 
  }

  add( addCarDto : AddCarDto ){
    const car : Car = {
      id:uuid(),
      brand: addCarDto.brand,
      model: addCarDto.model

    }
    this.cars.push(car);
    return car;
  }
  update( id : string , updateCarDto: UpdateCarDto){
    let carDB = this.findCarById(id);
    if( updateCarDto.id && updateCarDto.id !== id){
        throw new BadRequestException(`Car id is not valid`);
    }
    this.cars = this.cars.map(car =>{
      if( car.id===id ){
        carDB = {
          ...carDB,
          ...updateCarDto,
          id
        }; 
      }
      return car;
    })
    return carDB;
  }

  delete( id:string ){
    const car  = this.findCarById(id);
    this.cars = this.cars.filter( car => car.id !== id )
  }
}
