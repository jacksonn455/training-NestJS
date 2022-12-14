import { Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {

    constructor(private readonly coffeeService: CoffeesService) {}

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.coffeeService.FindOne(''+ id);
    }

    @Get() 
    findAll(@Query() paginationQuery) {
        //const { limit, offset } = paginationQuery;	
        return this.coffeeService.findAll();
        //return `This action returns all coffees. Limit: ${limit}, offset: ${offset}`;
        //http://localhost:3000/coffees?limit=2&offset=10
    }

    @Post()
    create(@Body() createCoffeeDto: CreateCoffeeDto) {
        console.log(createCoffeeDto instanceof CreateCoffeeDto);
        return this.coffeeService.create(createCoffeeDto);
        //return body;
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
        return this.coffeeService.update(id, updateCoffeeDto);
        //return `This action updates #${id} coffee`;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.coffeeService.remove(id);
        //return `This action remove #${id} coffee`;
    }

}
