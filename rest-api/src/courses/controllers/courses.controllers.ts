import { Controller, Get } from "@nestjs/common";
import { findAllCourses } from "../../../db-data";
import { Course } from '../../../../shared/course'
import { CoursesRepository } from "../repositories/courses.repository";

@Controller({

})

export class CoursesController {

    constructor(private courseDb: CoursesRepository) {

    }

    @Get('/api/courses')
    async findAllCourses(): Promise<Course[]> {
        return this.courseDb.findAll();
    }


}