import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm'
import { Category } from './entities/category.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Transaction } from '../transaction/entities/transaction.entity'

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>
  ) {
  }

  async create(createCategoryDto: CreateCategoryDto, id: number) {
    // existuje-li v db kategorie ze stejnym jmenem u stejneho uzivatele
    const exist = await this.categoryRepository.findBy({
      user: { id },
      title: createCategoryDto.title.toLowerCase()
    })

    if (exist.length)
      throw new BadRequestException('This category already exist')

    const newCategory = {
      title: createCategoryDto.title.toLowerCase(),
      user: {
        id
      }
    }

    return await this.categoryRepository.save(newCategory)
  }

  async findAll(id: number) {
    return await this.categoryRepository.find({
      where: {
        user: { id }
      },
      relations: {
        transactions: true
      }
    })
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: {
        user: true,
        transactions: true
      }
    })
    if (!category) throw new NotFoundException('Category not found')
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: {
        user: true,
        transactions: true
      }
    })
    if (!category) throw new NotFoundException('Category not found')

    return await this.categoryRepository.update(id, updateCategoryDto);
  }

  async remove(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: {
        transactions: true
      }
    })
    if (category && category.transactions.length > 0) {
      // Například můžete nastavit category na null nebo jinou kategorii
      await this.transactionRepository.update({ category: category }, { category: null });
    }
    if (!category) throw new NotFoundException('Category not found')
    return await this.categoryRepository.delete(id);
  }
}
