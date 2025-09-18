export interface College {
  id: string;
  name: string;
  type: 'Government' | 'Private' | 'Deemed University' | 'Central University';
  district: string;
  location: {
    coordinates: number[];
    address: string;
  };
  courses: {
    name: string;
    duration: string;
    annualFees: number;
    seatsTotal: number;
    seatsAvailable: number;
    cutoffPercentage: number;
    medium: string;
  }[];
  facilities: string[];
  ratings: {
    infrastructure: number;
    faculty: number;
    placement: number;
    overall: number;
  };
  placementStats: {
    placementRate: number;
    averagePackage: number;
    topRecruiters: string[];
  };
}

export const colleges: College[] = [
  {
    id: "gc_srinagar_01",
    name: "Government College for Women, Srinagar",
    type: "Government",
    district: "Srinagar",
    location: {
      coordinates: [34.0837, 74.7973],
      address: "Maulana Azad Road, Srinagar, J&K 190001"
    },
    courses: [
      {
        name: "B.A. English Literature",
        duration: "3 years",
        annualFees: 8000,
        seatsTotal: 60,
        seatsAvailable: 23,
        cutoffPercentage: 75,
        medium: "English"
      },
      {
        name: "B.Sc. Mathematics",
        duration: "3 years",
        annualFees: 8500,
        seatsTotal: 40,
        seatsAvailable: 15,
        cutoffPercentage: 80,
        medium: "English"
      },
      {
        name: "B.Com",
        duration: "3 years",
        annualFees: 7500,
        seatsTotal: 80,
        seatsAvailable: 35,
        cutoffPercentage: 70,
        medium: "English"
      }
    ],
    facilities: ["Library", "Computer Lab", "Hostel", "Sports Ground", "Cafeteria"],
    ratings: {
      infrastructure: 4.2,
      faculty: 4.0,
      placement: 3.8,
      overall: 4.0
    },
    placementStats: {
      placementRate: 65,
      averagePackage: 350000,
      topRecruiters: ["J&K Government", "Private Schools", "NGOs"]
    }
  },
  {
    id: "nit_srinagar_01",
    name: "National Institute of Technology, Srinagar",
    type: "Central University",
    district: "Srinagar",
    location: {
      coordinates: [34.0837, 74.7973],
      address: "Hazratbal, Srinagar, J&K 190006"
    },
    courses: [
      {
        name: "B.Tech Computer Science",
        duration: "4 years",
        annualFees: 125000,
        seatsTotal: 60,
        seatsAvailable: 8,
        cutoffPercentage: 95,
        medium: "English"
      },
      {
        name: "B.Tech Electronics",
        duration: "4 years",
        annualFees: 120000,
        seatsTotal: 45,
        seatsAvailable: 12,
        cutoffPercentage: 92,
        medium: "English"
      },
      {
        name: "B.Tech Civil",
        duration: "4 years",
        annualFees: 115000,
        seatsTotal: 50,
        seatsAvailable: 18,
        cutoffPercentage: 88,
        medium: "English"
      }
    ],
    facilities: ["Modern Labs", "Library", "Hostel", "Sports Complex", "WiFi Campus", "Research Centers"],
    ratings: {
      infrastructure: 4.8,
      faculty: 4.7,
      placement: 4.9,
      overall: 4.8
    },
    placementStats: {
      placementRate: 92,
      averagePackage: 1200000,
      topRecruiters: ["Google", "Microsoft", "Amazon", "TCS", "Infosys"]
    }
  },
  {
    id: "gu_jammu_01",
    name: "University of Jammu",
    type: "Central University",
    district: "Jammu",
    location: {
      coordinates: [32.7266, 74.8570],
      address: "Jammu Tawi, Jammu, J&K 180006"
    },
    courses: [
      {
        name: "B.A. Political Science",
        duration: "3 years",
        annualFees: 15000,
        seatsTotal: 100,
        seatsAvailable: 45,
        cutoffPercentage: 72,
        medium: "English/Hindi"
      },
      {
        name: "B.Sc. Physics",
        duration: "3 years",
        annualFees: 18000,
        seatsTotal: 60,
        seatsAvailable: 25,
        cutoffPercentage: 78,
        medium: "English"
      },
      {
        name: "BBA",
        duration: "3 years",
        annualFees: 25000,
        seatsTotal: 80,
        seatsAvailable: 30,
        cutoffPercentage: 75,
        medium: "English"
      }
    ],
    facilities: ["Central Library", "Computer Center", "Sports Complex", "Hostels", "Medical Center"],
    ratings: {
      infrastructure: 4.3,
      faculty: 4.2,
      placement: 4.1,
      overall: 4.2
    },
    placementStats: {
      placementRate: 78,
      averagePackage: 450000,
      topRecruiters: ["Government Departments", "Private Companies", "Banks"]
    }
  },
  {
    id: "gc_baramulla_01",
    name: "Government Degree College, Baramulla",
    type: "Government",
    district: "Baramulla",
    location: {
      coordinates: [34.2093, 74.3436],
      address: "Baramulla, J&K 193101"
    },
    courses: [
      {
        name: "B.A. History",
        duration: "3 years",
        annualFees: 6000,
        seatsTotal: 50,
        seatsAvailable: 28,
        cutoffPercentage: 65,
        medium: "English/Urdu"
      },
      {
        name: "B.Com",
        duration: "3 years",
        annualFees: 6500,
        seatsTotal: 60,
        seatsAvailable: 32,
        cutoffPercentage: 68,
        medium: "English"
      }
    ],
    facilities: ["Library", "Basic Labs", "Playground"],
    ratings: {
      infrastructure: 3.5,
      faculty: 3.8,
      placement: 3.2,
      overall: 3.5
    },
    placementStats: {
      placementRate: 45,
      averagePackage: 250000,
      topRecruiters: ["Local Businesses", "Government Offices", "Schools"]
    }
  }
];
