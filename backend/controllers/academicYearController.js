const { AcademicYear } = require('../config/associations');

// Krijo një vit akademik të ri
exports.createAcademicYear = async (req, res) => {
  try {
    const { name, isActive } = req.body;

    // Mund të bëni ca validime të thjeshta:
    if (!name) {
      return res.status(400).json({ error: 'Name is required.' });
    }

    const newAY = await AcademicYear.create({
      name,
      isActive: isActive ?? true, 
    });

    res.status(201).json({
      message: 'Academic year created successfully',
      academicYear: newAY
    });
  } catch (error) {
    console.error('Create AcademicYear Error:', error);
    res.status(500).json({ error: 'Failed to create academic year.' });
  }
};

// Lista e të gjithë viteve akademike
exports.getAllAcademicYears = async (req, res) => {
  try {
    const list = await AcademicYear.findAll();
    res.json(list);
  } catch (error) {
    console.error('Get AcademicYears Error:', error);
    res.status(500).json({ error: 'Failed to fetch academic years.' });
  }
};

// Merr një vit akademik me ID
exports.getAcademicYearById = async (req, res) => {
  try {
    const { id } = req.params;
    const ay = await AcademicYear.findByPk(id);

    if (!ay) {
      return res.status(404).json({ error: 'Academic year not found.' });
    }

    res.json(ay);
  } catch (error) {
    console.error('Get AcademicYear Error:', error);
    res.status(500).json({ error: 'Failed to fetch academic year.' });
  }
};

// Përditëson një vit akademik me ID
exports.updateAcademicYear = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, isActive } = req.body;

    const ay = await AcademicYear.findByPk(id);
    if (!ay) {
      return res.status(404).json({ error: 'Academic year not found.' });
    }

    // Bëni update me fushat që vijnë:
    await ay.update({
      ...(name !== undefined ? { name } : {}),
      ...(isActive !== undefined ? { isActive } : {}),
    });

    res.json({
      message: 'Academic year updated successfully',
      academicYear: ay
    });
  } catch (error) {
    console.error('Update AcademicYear Error:', error);
    res.status(500).json({ error: 'Failed to update academic year.' });
  }
};

// Fshin një vit akademik me ID
exports.deleteAcademicYear = async (req, res) => {
  try {
    const { id } = req.params;
    const ay = await AcademicYear.findByPk(id);

    if (!ay) {
      return res.status(404).json({ error: 'Academic year not found.' });
    }

    await ay.destroy();

    res.status(204).send();
  } catch (error) {
    console.error('Delete AcademicYear Error:', error);
    res.status(500).json({ error: 'Failed to delete academic year.' });
  }
};
