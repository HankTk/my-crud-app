# MyCrudApp

A modern CRUD (Create, Read, Update, Delete) application built with Angular 20. This application demonstrates best practices in Angular development and provides a robust foundation for building scalable web applications.

## Features

- Modern Angular 20 architecture
- Angular Material UI components
- Responsive design
- TypeScript support
- Built-in testing setup with Jasmine and Karma

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (LTS version recommended)
- npm (comes with Node.js)
- Angular CLI (`npm install -g @angular/cli`)

## Getting Started

1. Clone the repository:
```bash
git clone [repository-url]
cd my-crud-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Project Structure

```
my-crud-app/
├── src/                    # Source files
├── public/                 # Public assets
├── .angular/              # Angular build files
├── node_modules/          # Dependencies
└── ...config files
```

## Available Scripts

- `ng serve` - Start development server
- `ng build` - Build the project
- `ng test` - Run unit tests
- `ng e2e` - Run end-to-end tests
- `ng generate component component-name` - Generate new component

## Dependencies

### Core Dependencies
- Angular 20.0.0
- Angular Material 20.0.1
- RxJS 7.8.0
- TypeScript 5.8.0

### Development Dependencies
- Angular CLI 20.0.0
- Jasmine & Karma for testing
- TypeScript compiler

## Building for Production

To build the project for production:

```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## Testing

This project uses Jasmine and Karma for testing. Run the tests with:

```bash
ng test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the repository or contact the maintainers.
