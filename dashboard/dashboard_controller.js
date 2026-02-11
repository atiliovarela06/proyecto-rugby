exports.adminDashboard = (req, res) => {
    res.render('admin', {
        user: req.session.user
    });
};

exports.clubDashboard = (req, res) => {
    res.render('club_dashboard', {
        user: req.session.user
    });
};

exports.viewerDashboard = (req, res) => {
    res.render('viewer', {
        user: req.session.user
    });
};