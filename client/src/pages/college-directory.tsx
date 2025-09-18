import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { colleges, College } from "../data/colleges";
import { Search, MapPin, Star, Heart, Share, Filter, Grid, List, Users, IndianRupee, TrendingUp, Award } from "lucide-react";

type ViewMode = 'grid' | 'list';
type SortBy = 'name' | 'rating' | 'fees' | 'placement';

export default function CollegeDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortBy>('rating');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [compareList, setCompareList] = useState<Set<string>>(new Set());

  const districts = Array.from(new Set(colleges.map(c => c.district)));
  const types = Array.from(new Set(colleges.map(c => c.type)));

  const filteredColleges = colleges
    .filter(college => {
      const matchesSearch = college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           college.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           college.courses.some(course => course.name.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesDistrict = selectedDistrict === "all" || college.district === selectedDistrict;
      const matchesType = selectedType === "all" || college.type === selectedType;
      
      return matchesSearch && matchesDistrict && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return b.ratings.overall - a.ratings.overall;
        case 'fees':
          return (a.courses[0]?.annualFees || 0) - (b.courses[0]?.annualFees || 0);
        case 'placement':
          return b.placementStats.placementRate - a.placementStats.placementRate;
        default:
          return 0;
      }
    });

  const toggleFavorite = (collegeId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(collegeId)) {
      newFavorites.delete(collegeId);
    } else {
      newFavorites.add(collegeId);
    }
    setFavorites(newFavorites);
  };

  const toggleCompare = (collegeId: string) => {
    const newCompareList = new Set(compareList);
    if (newCompareList.has(collegeId)) {
      newCompareList.delete(collegeId);
    } else if (newCompareList.size < 3) {
      newCompareList.add(collegeId);
    }
    setCompareList(newCompareList);
  };

  const formatFees = (fees: number) => {
    if (fees >= 100000) {
      return `₹${(fees / 100000).toFixed(1)}L`;
    }
    return `₹${(fees / 1000).toFixed(0)}K`;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Government':
        return 'bg-green-100 text-green-800';
      case 'Central University':
        return 'bg-blue-100 text-blue-800';
      case 'Private':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const CollegeCard = ({ college, isCompact = false }: { college: College, isCompact?: boolean }) => (
    <Card className="card-hover h-full">
      <CardContent className={`p-6 h-full flex flex-col ${isCompact ? 'p-4' : ''}`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className={`font-semibold text-card-foreground mb-2 ${isCompact ? 'text-lg' : 'text-xl'}`}>
              {college.name}
            </h3>
            <div className="flex items-center space-x-2 text-muted-foreground mb-2">
              <MapPin className="w-4 h-4" />
              <span>{college.district}, J&K</span>
              <Badge className={getTypeColor(college.type)}>
                {college.type}
              </Badge>
            </div>
          </div>
          <div className="text-right ml-4">
            <div className="flex items-center space-x-1 mb-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="font-semibold">{college.ratings.overall.toFixed(1)}</span>
            </div>
            <div className="text-sm text-muted-foreground">Rating</div>
          </div>
        </div>

        <div className="mb-4 flex-1">
          <h4 className="font-medium mb-2">Popular Courses</h4>
          <div className="flex flex-wrap gap-2">
            {college.courses.slice(0, 3).map((course, i) => (
              <Badge key={i} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                {course.name}
              </Badge>
            ))}
          </div>
        </div>

        <div className={`grid grid-cols-2 gap-4 mb-4 ${isCompact ? 'grid-cols-1' : ''}`}>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-xl font-bold text-blue-600">
              {formatFees(college.courses[0]?.annualFees || 0)}
            </div>
            <div className="text-sm text-blue-600">Annual Fees</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-xl font-bold text-green-600">{college.placementStats.placementRate}%</div>
            <div className="text-sm text-green-600">Placement Rate</div>
          </div>
        </div>

        <div className="flex space-x-2 mt-auto">
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                className="flex-1" 
                onClick={() => setSelectedCollege(college)}
                data-testid={`button-view-details-${college.id}`}
              >
                View Details
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">{college.name}</DialogTitle>
                <DialogDescription>
                  Complete information about courses, facilities, and placement statistics
                </DialogDescription>
              </DialogHeader>
              
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="courses">Courses</TabsTrigger>
                  <TabsTrigger value="facilities">Facilities</TabsTrigger>
                  <TabsTrigger value="placement">Placement</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">College Information</h4>
                      <div className="space-y-2">
                        <div><strong>Type:</strong> {college.type}</div>
                        <div><strong>District:</strong> {college.district}</div>
                        <div><strong>Address:</strong> {college.location.address}</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Ratings</h4>
                      <div className="space-y-3">
                        {Object.entries(college.ratings).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center">
                            <span className="capitalize">{key}:</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-500 h-2 rounded-full" 
                                  style={{ width: `${(value / 5) * 100}%` }}
                                />
                              </div>
                              <span className="font-medium">{value.toFixed(1)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="courses" className="space-y-4">
                  {college.courses.map((course, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-semibold text-lg">{course.name}</h5>
                            <p className="text-muted-foreground">Duration: {course.duration}</p>
                            <p className="text-muted-foreground">Medium: {course.medium}</p>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Annual Fees:</span>
                              <span className="font-semibold">{formatFees(course.annualFees)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Total Seats:</span>
                              <span>{course.seatsTotal}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Available:</span>
                              <span className="text-green-600 font-semibold">{course.seatsAvailable}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Cutoff:</span>
                              <span>{course.cutoffPercentage}%</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="facilities">
                  <div className="grid md:grid-cols-3 gap-4">
                    {college.facilities.map((facility, index) => (
                      <div key={index} className="flex items-center space-x-2 p-3 bg-accent/50 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span>{facility}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="placement" className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-blue-50 rounded-lg">
                      <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-600">{college.placementStats.placementRate}%</div>
                      <div className="text-blue-600">Placement Rate</div>
                    </div>
                    <div className="text-center p-6 bg-green-50 rounded-lg">
                      <IndianRupee className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-600">
                        {formatFees(college.placementStats.averagePackage)}
                      </div>
                      <div className="text-green-600">Average Package</div>
                    </div>
                    <div className="text-center p-6 bg-purple-50 rounded-lg">
                      <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-purple-600">{college.placementStats.topRecruiters.length}</div>
                      <div className="text-purple-600">Top Recruiters</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Top Recruiters</h4>
                    <div className="flex flex-wrap gap-2">
                      {college.placementStats.topRecruiters.map((recruiter, index) => (
                        <Badge key={index} variant="outline">
                          {recruiter}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => toggleFavorite(college.id)}
            data-testid={`button-favorite-${college.id}`}
          >
            <Heart className={`w-4 h-4 ${favorites.has(college.id) ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => toggleCompare(college.id)}
            disabled={compareList.size >= 3 && !compareList.has(college.id)}
            data-testid={`button-compare-${college.id}`}
          >
            <Share className={`w-4 h-4 ${compareList.has(college.id) ? 'text-blue-500' : ''}`} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">J&K College Directory</h1>
          <p className="text-xl text-muted-foreground">Comprehensive database of colleges across Jammu & Kashmir</p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="p-6 mb-8 shadow-lg border">
            <div className="grid md:grid-cols-4 gap-4 mb-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search colleges, courses, or locations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                    data-testid="input-search-colleges"
                  />
                </div>
              </div>
              <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                <SelectTrigger data-testid="select-district">
                  <SelectValue placeholder="All Districts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Districts</SelectItem>
                  {districts.map(district => (
                    <SelectItem key={district} value={district}>{district}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger data-testid="select-type">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {types.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Sort by:</span>
                  <Select value={sortBy} onValueChange={(value: SortBy) => setSortBy(value)}>
                    <SelectTrigger className="w-32" data-testid="select-sort">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">Rating</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="fees">Fees</SelectItem>
                      <SelectItem value="placement">Placement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-1 border border-border rounded-md">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    data-testid="button-grid-view"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    data-testid="button-list-view"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground">
                {filteredColleges.length} colleges found
                {compareList.size > 0 && (
                  <Button variant="outline" size="sm" className="ml-4" data-testid="button-compare-colleges">
                    Compare ({compareList.size})
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* College Grid/List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={viewMode === 'grid' ? 'grid lg:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredColleges.map((college, index) => (
              <motion.div
                key={college.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                <CollegeCard college={college} isCompact={viewMode === 'list'} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {filteredColleges.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No colleges found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
          </motion.div>
        )}

        {/* Load More Button */}
        {filteredColleges.length > 0 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button variant="outline" size="lg" data-testid="button-load-more">
              Load More Colleges
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
