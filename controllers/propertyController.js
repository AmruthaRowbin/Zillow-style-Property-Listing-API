
const Property = require('../models/Property');
const redis = require('../config/redis');




//add property
exports.createProperty = async (req, res) => {
  try {
    const property = await Property.create({ ...req.body, user: req.user.id });
    console.log(property,"pppppppppppppppppp")

    // Clear Redis cache for properties list
    await redis.del('properties');

    res.status(201).json({
      success: true,
      message: "Property added successfully",
      data: property
    });

  } catch (error) {
    console.error('Error creating property:', error.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong while creating the property",
      error: error.message
    });
  }
};



// get property by id
exports.getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    res.status(200).json({
      success: true,
      message: "Property retrieved successfully",
      data: property
    });

  } catch (error) {
    console.error('Error fetching property:', error.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong while retrieving the property",
      error: error.message
    });
  }
};

// update property
exports.updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
  console.log(id,"iddddddddddddddddddd")
    console.log('Updating property:', req.body);

    const updated = await Property.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Property not found"
      });
    }

    // Invalidate Redis cache
    await redis.del('properties');

    res.status(200).json({
      success: true,
      message: "Property updated successfully",
      data: updated
    });

  } catch (error) {
    console.error('Error updating property:', error.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong while updating the property",
      error: error.message
    });
  }
};

// delete property
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Invalidate Redis cache
    await redis.del('properties');

    res.status(200).json({
      success: true,
      message: 'Property deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting property:', error.message);
    res.status(500).json({
      success: false,
      message: 'Something went wrong while deleting the property',
      error: error.message
    });
  }
};


// get all property , or get property based on the filter search
exports.getProperties = async (req, res) => {
  try {
    
    const { location, minPrice, maxPrice, bedrooms, page = 1, limit = 10 } = req.query;
    const filters = {};

    //  Apply search filters
    if (location) filters.location = { $regex: location, $options: 'i' };
    if (bedrooms) filters.bedrooms = +bedrooms;
    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.$gte = +minPrice;
      if (maxPrice) filters.price.$lte = +maxPrice;
    }

    //  Pagination setup
    const skip = (page - 1) * limit;

    // Redis cache key based on filters + page
    const cacheKey = 'properties:' + JSON.stringify(req.query);

    //  Redis read first
    try {
      const cached = await redis.get(cacheKey);
      if (cached) {
        return res.status(200).json({
          success: true,
          fromCache: true,
          message:"data fetched from redis",
          data: JSON.parse(cached)
        });
      }
    } catch (redisReadErr) {
      console.warn(' Redis read failed:', redisReadErr.message);
    }

    //  Get total matching items
    const total = await Property.countDocuments(filters);

    //  Fetch paginated properties
    const properties = await Property.find(filters)
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    //   caching result in Redis
    try {
      await redis.set(cacheKey, JSON.stringify(properties), { EX: 300 }); // Cache for 5 minutes
    } catch (redisWriteErr) {
      console.warn(' Redis write failed:', redisWriteErr.message);
    }

    
    res.status(200).json({
      success: true,
      fromCache: false,
      count: properties.length,
      page: Number(page),
      limit: Number(limit),
      total, 
      pages: Math.ceil(total / limit), 
      data: properties
    });

  } catch (error) {
    console.error(' Error fetching properties:', error.message);
    res.status(500).json({
      success: false,
      message: 'Something went wrong while retrieving properties',
      error: error.message
    });
  }
};
