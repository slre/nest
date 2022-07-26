import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { AddCarDto } from './dtos/add-car.dto';
import { UpdateCarDto } from './dtos/update-car.dto';

@Controller('cars')
export class CarsController {
  constructor(
    private readonly CarsService : CarsService
  ){

  }  
  @Get('all')
  getCars() {
    return this.CarsService.findAll();
  }
  @Get(':id')
  getCarById( @Param('id',ParseUUIDPipe ) id: string ){
    return this.CarsService.findCarById( id );
  }

  @Post()
  addCar( @Body() addCarDto:AddCarDto){
    return this.CarsService.add( addCarDto );
  }
  @Patch (':id')
  updateCar( 
    @Param( 'id',ParseUUIDPipe ) id:string,
    @Body() updateCarDto : UpdateCarDto)
  {
      return this.CarsService.update( id,updateCarDto );
  }
  @Delete(':id')
  removeCar( @Param('id', ParseUUIDPipe ) id: string ){
    return this.CarsService.delete( id );
  }
}
