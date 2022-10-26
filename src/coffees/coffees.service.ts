import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Injectable()
export class CoffeesService {
       constructor(
        @InjectRepository(Coffee)
        private readonly coffeesRepository: Repository<Coffee>) {}
    
    findAll() {
        return this.coffeesRepository.find();
    }

    async FindOne(id: string) {
        const coffee = await this.coffeesRepository.findOne({where: {id: +id}});
        if (!coffee) {
            throw new NotFoundException(`Coffee #${id} not found`);
        }
        return coffee;
    }

    create(createCoffeeDto: CreateCoffeeDto) {
        const coffee = this.coffeesRepository.create(createCoffeeDto);
        return this.coffeesRepository.save(coffee);
    }

    async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
        const existingCoffee = await this.coffeesRepository.preload({
            id: + id,
            ...updateCoffeeDto,
        });
        if (existingCoffee) {
            //update the existing entity
        }
    }

    async remove(id: string) {
        const coffee = await this.FindOne(id);
        return this.coffeesRepository.remove(coffee);
    }
}
