import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CourseGuard, DefaultGuard } from '../auth';
import { CoursesService } from './courses.service';
import { CourseDto } from './dto';


@Controller('courses')
@ApiTags('courses')
export class CoursesController {
  constructor(private courseService: CoursesService) {}

  @Get('/')
  @UseGuards(DefaultGuard, CourseGuard)
  @ApiOperation({ operationId: 'getCourses' })
  @ApiOkResponse({ type: [CourseDto] })
  public async getCourses() {
    const data = await this.courseService.getAll();
    return data.map(it => new CourseDto(it));
  }

  @Get('/:courseId')
  @UseGuards(DefaultGuard, CourseGuard)
  @ApiOperation({ operationId: 'getCourse' })
  @ApiForbiddenResponse()
  @ApiOkResponse({ type: CourseDto })
  public async getCourse(@Param('courseId', ParseIntPipe) courseId: number) {
    const data = await this.courseService.getById(courseId);
    return new CourseDto(data);
  }
}
