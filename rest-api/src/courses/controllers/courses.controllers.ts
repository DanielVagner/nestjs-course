import { Body, Controller, Get, Param, Put } from "@nestjs/common";
import { Course } from '../../../../shared/course';
import { CoursesRepository } from "../repositories/courses.repository";


@Controller('courses')

export class CoursesController {

    constructor(private courseDb: CoursesRepository) {

    }

    @Get()
    async findAllCourses(): Promise<Course[]> {
        return this.courseDb.findAll();
    }

    @Put(':courseId')
    async updateCourse(
        @Param("courseId") courseId: string,
        @Body() changes: Partial<Course>): Promise<Course> {
        console.log('updating course');

        return this.courseDb.updateCourse(courseId, changes);
    }


}