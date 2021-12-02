import { Controller, Get, Render } from '@nestjs/common';

@Controller('app')
export class AppController {
    @Get()
    @Render('index')
    root () {
        return {message: 'Render view engine HBS'};
    }
}
