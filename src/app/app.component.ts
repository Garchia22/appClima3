import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { WeatherService } from './services/weather.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, FormsModule, CommonModule], // Asegúrate de que HttpClientModule esté aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'appClima';
  lat: number | null = null;
  lon: number | null = null;
  weatherData: any;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    console.log('AppComponent initialized');
  }

  onSubmitCoordinates(): void {
    if (this.lat !== null && this.lon !== null) {
      console.log('Form submitted with coordinates:', this.lat, this.lon);
      this.getWeatherByCoordinates(this.lat, this.lon);
    }
  }

  getWeatherByCoordinates(lat: number, lon: number): void {
    this.weatherService.getWeatherByCoordinates(lat, lon).subscribe(
      data => {
        this.weatherData = data;
        console.log('Weather data:', this.weatherData);
      },
      error => {
        console.error('Error fetching weather data', error);
      }
    );
  }
}