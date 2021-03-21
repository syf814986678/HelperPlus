function isPointInPolygon(point, polygon) {
  var pts = polygon;
  var N = pts.length;
  var boundOrVertex = true;
  var intersectCount = 0;
  var precision = 2e-10;
  var p1, p2;
  var p = point;
  p1 = pts[0];
  for (var i = 1; i <= N; ++i) {
      if (p.lat == p1.lat || p.lng == p1.lng) {
          return boundOrVertex
      }
      p2 = pts[i % N];
      if (p.lat < Math.min(p1.lat, p2.lat) || p.lat > Math.max(p1.lat, p2.lat)) {
          p1 = p2;
          continue
      }
      if (p.lat > Math.min(p1.lat, p2.lat) && p.lat < Math.max(p1.lat, p2.lat)) {
          if (p.lng <= Math.max(p1.lng, p2.lng)) {
              if (p1.lat == p2.lat && p.lng >= Math.min(p1.lng, p2.lng)) {
                  return boundOrVertex
              }
              if (p1.lng == p2.lng) {
                  if (p1.lng == p.lng) {
                      return boundOrVertex
                  } else {
                      ++intersectCount
                  }
              } else {
                  var xinters = (p.lat - p1.lat) * (p2.lng - p1.lng) / (p2.lat - p1.lat) + p1.lng;
                  if (Math.abs(p.lng - xinters) < precision) {
                      return boundOrVertex
                  }
                  if (p.lng < xinters) {
                      ++intersectCount
                  }
              }
          }
      } else {
          if (p.lat == p2.lat && p.lng <= p2.lng) {
              var p3 = pts[(i + 1) % N];
              if (p.lat >= Math.min(p1.lat, p3.lat) && p.lat <= Math.max(p1.lat, p3.lat)) {
                  ++intersectCount
              } else {
                  intersectCount += 2
              }
          }
      }
      p1 = p2
  }
  if (intersectCount % 2 == 0) {
      return false
  } else {
      return true
  }
}

module.exports = {isPointInPolygon: isPointInPolygon};