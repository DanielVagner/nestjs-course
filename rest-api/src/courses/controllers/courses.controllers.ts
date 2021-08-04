import { Body, Controller, Delete, Get, HttpException, Param, Post, Put } from "@nestjs/common";
import { Course } from '../../../../shared/course';
import { CoursesRepository } from "../repositories/courses.repository";


@Controller('courses')

export class CoursesController {

    constructor(private courseDb: CoursesRepository) {

    }

    @Post()
    async createCourse(@Body() course: Partial<Course>): Promise<Course> {
        console.log("creating new course");

        return this.courseDb.addCourse(course)
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

        if (changes._id) {
            throw new HttpException("Can't update course id", 400);
        }

        return this.courseDb.updateCourse(courseId, changes);
    }

    @Delete(':courseId')
    async deleteCourse(@Param('courseId') courseId: string) {
        console.log("deleting course" + courseId);

        if (!courseId) {
            throw new HttpException("Id was empty", 400);
        }

        return this.courseDb.deleteCourse(courseId);
    }


}