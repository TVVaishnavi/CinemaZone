const theatreService = require('../src/service/theatre');
const Theatre = require('../src/model/theatre');
jest.mock('../src/service/theatre'); // Mock the service layer
jest.mock('../src/model/theatre'); // Mock the Theatre model

describe('Theatre Controller and Service Tests', () => {
  let res;

  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mocks before each test
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  // Mock the model methods and constructor
  const mockTheatreData = {
    name: 'Cinema Hall',
    location: 'New York',
    seatingCapacity: 200,
    contact: { phone: '1234567890', email: 'test@theatre.com' },
    amenities: ['Wifi', 'Parking'],
  };

  const mockTheatre = {
    ...mockTheatreData,
    _id: '1',
    save: jest.fn().mockResolvedValue(mockTheatre), // Corrected here
  };

  // Mock the Theatre constructor to return the mockTheatre instance
  Theatre.mockImplementation(() => mockTheatre);

  // Service Layer Tests
  describe('Theatre Service', () => {
    test('createTheatre should create a new theatre', async () => {
      theatreService.createTheatre.mockResolvedValue(mockTheatre);

      const result = await theatreService.createTheatre(mockTheatreData);
      expect(result).toEqual(mockTheatre);
      expect(Theatre).toHaveBeenCalledWith(mockTheatreData); // Now it should be called with mock data
      expect(mockTheatre.save).toHaveBeenCalled(); // Ensure save was called
    });
  });

  // Controller Layer Tests
  describe('Theatre Controller', () => {
    test('createTheatre should respond with success message and created theatre', async () => {
      theatreService.createTheatre.mockResolvedValue(mockTheatre);

      const req = { body: mockTheatreData };
      await theatreController.createTheatre(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Theatre created successfully',
        theatre: mockTheatre,
      });
    });
  });
});
