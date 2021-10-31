import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsMongoId, IsString } from "class-validator";


export class Course {
  @ApiProperty()
  @IsString()
  @IsMongoId() 
  _id: string;


  @ApiProperty()
  @IsInt({message: "seqNo must be numeric"})
  seqNo:number;

  @ApiProperty()
  @IsString({always: false}) 
  url:string;

  @ApiProperty()
  @IsString() 
  iconUrl: string;

  @ApiProperty()
  @IsString() 
  courseListIcon: string;

  @ApiProperty()
  @IsString() 
  description: string;

  @ApiProperty()
  @IsString() 
  longDescription?: string;

  @ApiProperty()
  @IsString() 
  category: string;

  @ApiProperty()
  @IsInt() 
  lessonsCount: number;

  @ApiProperty()
  @IsBoolean() 
  promo: boolean;
}


export function compareCourses(c1:Course, c2: Course) {

  const compare = c1.seqNo - c2.seqNo;

  if (compare > 0) {
    return 1;
  }
  else if ( compare < 0) {
    return -1;
  }
  else return 0;

}
