import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
    //@ApiProperty()
    id: number;
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    lastName: string;
    @ApiProperty()
    position: number;
}
