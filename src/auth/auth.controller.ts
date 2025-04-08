import { Body, Controller, Post, UnauthorizedException, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response as Res } from 'express'; // Import Response from Express
import { RegisterDto } from './otd/register.otd';
import { LoginDto } from './otd/login.otd';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 201, description: 'User has been created.' })
    @ApiResponse({ status: 409, description: 'Email already in use.' })
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto.email, registerDto.password);
    }

    @Post('login')
    @ApiOperation({ summary: 'Login a user and return JWT token' })
    @ApiResponse({ status: 200, description: 'Successfully logged in and returned access token.' })
    @ApiResponse({ status: 401, description: 'Invalid credentials.' })
    async login(@Body() loginDto: LoginDto, @Response() res: Res) {
        // Validate user credentials
        const user = await this.authService.validateUser(loginDto.email, loginDto.password);
        if (!user) throw new UnauthorizedException('Invalid credentials');

        // Generate JWT token using the AuthService
        const { access_token, user: userData } = await this.authService.login(user);

        // Set the JWT token in the response header
        res.setHeader('Authorization', `Bearer ${access_token}`);

        // Return the user data and message in the response body
        return res.status(200).json({
            message: 'Login successful   ---------------',
            token: access_token,
            user: userData,
        });
    }
}
