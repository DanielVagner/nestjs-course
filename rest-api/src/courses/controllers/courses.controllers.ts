import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { Course } from '../../models/course';
import { CoursesRepository } from "../repositories/courses.repository";
import { AuthenticationGuard } from "../../guards/authentication.guard";
import { AdminGuard } from "../../guards/admin.guard";


@ApiTags('courses')
@Controller('courses')
@UseGuards(AuthenticationGuard)
export class CoursesController {
    constructor(private courseDb: CoursesRepository) {
    }

    @Post()
    @UseGuards(AdminGuard)
    @ApiBody({ type: Course, description: "Create new course"})
  
    async createCourse(@Body() course: Course): Promise<Course> {
        console.log("creating new course");
        
        return this.courseDb.addCourse(course)
    }

    @Get()
    async findAllCourses(): Promise<Course[]> {
        return this.courseDb.findAll();
    }

    @Put(':courseId')
    @ApiBody({ type: Course, description: "Update course"})
    async updateCourse(
        @Param("courseId") courseId: string,
        @Body() changes: Course): Promise<Course> {
        console.log('updating course');

        if (changes._id) {
            throw new HttpException("Can't update course id", 400);
        }

        return this.courseDb.updateCourse(courseId, changes);
    }

    @Delete(':courseId')
    @UseGuards(AdminGuard)
    async deleteCourse(@Param('courseId') courseId: string) {
        console.log("deleting course" + courseId);

        if (!courseId) {
            throw new HttpException("Id was empty", 400);
        }

        return this.courseDb.deleteCourse(courseId);
    }


}