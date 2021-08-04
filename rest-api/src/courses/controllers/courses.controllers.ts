import { Body, Controller, Delete, Get, Param, Put } from "@nestjs/common";
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

    @Delete(':courseId')
    async deleteCourse(@Param('courseId') courseId: string) {
        console.log("deleting course" + courseId);

        return this.courseDb.deleteCourse(courseId);
    }


}