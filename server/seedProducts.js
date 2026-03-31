import sequelize from './config/database.js'
import Product from './models/Product.js'

const products = [
  // New Collection - 20 sản phẩm
  { name: 'Đầm xòe công sở cổ lệch xếp ly', code: 'NC001', price: 590000, category: 'New Collection', sizes: ['S', 'M', 'L', 'XL'], stock: 50, featured: true },
  { name: 'Đầm midi xòe phối viền đen thanh lịch', code: 'NC002', price: 590000, category: 'New Collection', sizes: ['S', 'M', 'L', 'XL'], stock: 45, featured: true },
  { name: 'Đầm voan hoa nhí dáng A cổ V', code: 'NC003', price: 580000, category: 'New Collection', sizes: ['S', 'M', 'L', 'XL'], stock: 40, featured: true },
  { name: 'Đầm ren xanh đính hoa cao cấp', code: 'NC004', price: 690000, category: 'New Collection', sizes: ['S', 'M', 'L'], stock: 30, featured: true },
  { name: 'Đầm đen xòe chữ A phối ren', code: 'NC005', price: 620000, category: 'New Collection', sizes: ['S', 'M', 'L', 'XL'], stock: 38, featured: true },
  { name: 'Đầm trắng công sở tay bồng', code: 'NC006', price: 580000, category: 'New Collection', sizes: ['S', 'M', 'L', 'XL'], stock: 45, featured: true },
  { name: 'Đầm xanh mint xòe nhẹ cổ tròn', code: 'NC007', price: 540000, category: 'New Collection', sizes: ['S', 'M', 'L', 'XL'], stock: 42, featured: false },
  { name: 'Đầm hoa cam vintage dáng A', code: 'NC008', price: 590000, category: 'New Collection', sizes: ['S', 'M', 'L', 'XL'], stock: 38, featured: false },
  { name: 'Đầm đen midi xòe tay lỡ', code: 'NC009', price: 610000, category: 'New Collection', sizes: ['S', 'M', 'L', 'XL'], stock: 40, featured: false },
  { name: 'Đầm ren trắng dự tiệc cổ V', code: 'NC010', price: 720000, category: 'New Collection', sizes: ['S', 'M', 'L'], stock: 25, featured: true },
  { name: 'Đầm hoa nhí xanh dương cổ vuông', code: 'NC011', price: 570000, category: 'New Collection', sizes: ['S', 'M', 'L', 'XL'], stock: 40, featured: false },
  { name: 'Đầm công sở xám xếp ly', code: 'NC012', price: 550000, category: 'New Collection', sizes: ['S', 'M', 'L', 'XL'], stock: 48, featured: false },
  { name: 'Đầm hoa đỏ burgundy dáng xòe', code: 'NC013', price: 590000, category: 'New Collection', sizes: ['S', 'M', 'L', 'XL'], stock: 40, featured: false },
  { name: 'Đầm trắng ren cao cấp tay dài', code: 'NC014', price: 780000, category: 'New Collection', sizes: ['S', 'M', 'L'], stock: 20, featured: true },
  { name: 'Đầm xanh lá nhạt xòe nhẹ', code: 'NC015', price: 560000, category: 'New Collection', sizes: ['S', 'M', 'L', 'XL'], stock: 42, featured: false },
  { name: 'Đầm hoa tím pastel dáng A', code: 'NC016', price: 580000, category: 'New Collection', sizes: ['S', 'M', 'L', 'XL'], stock: 40, featured: false },
  { name: 'Đầm vàng mustard xòe tay phồng', code: 'NC017', price: 590000, category: 'New Collection', sizes: ['S', 'M', 'L', 'XL'], stock: 38, featured: false },
  { name: 'Đầm xanh denim dáng suông', code: 'NC018', price: 640000, category: 'New Collection', sizes: ['S', 'M', 'L', 'XL'], stock: 35, featured: false },
  { name: 'Đầm hồng phấn công sở tay lỡ', code: 'NC019', price: 570000, category: 'New Collection', sizes: ['S', 'M', 'L', 'XL'], stock: 45, featured: false },
  { name: 'Đầm đen ren dự tiệc sang trọng', code: 'NC020', price: 750000, category: 'New Collection', sizes: ['S', 'M', 'L'], stock: 22, featured: true },

  // Áo - 20 sản phẩm
  { name: 'Áo ren cotton kiểu peplum màu kem', code: 'AO001', price: 300000, category: 'Áo', sizes: ['S', 'M', 'L', 'XL'], stock: 60, featured: true },
  { name: 'Áo sơ mi trắng cổ vest tay dài', code: 'AO002', price: 320000, category: 'Áo', sizes: ['S', 'M', 'L'], stock: 55, featured: false },
  { name: 'Áo kiểu hoa nhí tay bồng', code: 'AO003', price: 280000, category: 'Áo', sizes: ['S', 'M', 'L'], stock: 60, featured: false },
  { name: 'Áo sơ mi xanh navy cổ tròn', code: 'AO004', price: 310000, category: 'Áo', sizes: ['S', 'M', 'L', 'XL'], stock: 58, featured: false },
  { name: 'Áo kiểu đen phối nơ cổ', code: 'AO005', price: 340000, category: 'Áo', sizes: ['S', 'M', 'L'], stock: 52, featured: false },
  { name: 'Áo sơ mi hồng pastel tay lỡ', code: 'AO006', price: 290000, category: 'Áo', sizes: ['S', 'M', 'L', 'XL'], stock: 60, featured: false },
  { name: 'Áo kiểu trắng cổ sen xếp ly', code: 'AO007', price: 330000, category: 'Áo', sizes: ['S', 'M', 'L'], stock: 55, featured: false },
  { name: 'Áo sơ mi kẻ sọc xanh trắng', code: 'AO008', price: 300000, category: 'Áo', sizes: ['S', 'M', 'L', 'XL'], stock: 58, featured: false },
  { name: 'Áo kiểu vàng mustard tay phồng', code: 'AO009', price: 320000, category: 'Áo', sizes: ['S', 'M', 'L'], stock: 52, featured: false },
  { name: 'Áo sơ mi đen cổ V thanh lịch', code: 'AO010', price: 340000, category: 'Áo', sizes: ['S', 'M', 'L', 'XL'], stock: 55, featured: false },
  { name: 'Áo kiểu xanh mint tay lửng', code: 'AO011', price: 310000, category: 'Áo', sizes: ['S', 'M', 'L'], stock: 58, featured: false },
  { name: 'Áo sơ mi trắng phối ren', code: 'AO012', price: 350000, category: 'Áo', sizes: ['S', 'M', 'L'], stock: 50, featured: false },
  { name: 'Áo kiểu hồng phấn cổ vuông', code: 'AO013', price: 290000, category: 'Áo', sizes: ['S', 'M', 'L', 'XL'], stock: 60, featured: false },
  { name: 'Áo sơ mi xám tay dài basic', code: 'AO014', price: 300000, category: 'Áo', sizes: ['S', 'M', 'L', 'XL'], stock: 62, featured: false },
  { name: 'Áo kiểu đỏ burgundy tay bồng', code: 'AO015', price: 330000, category: 'Áo', sizes: ['S', 'M', 'L'], stock: 52, featured: false },
  { name: 'Áo sơ mi trắng cổ thuyền', code: 'AO016', price: 320000, category: 'Áo', sizes: ['S', 'M', 'L', 'XL'], stock: 55, featured: false },
  { name: 'Áo kiểu xanh dương hoa nhí', code: 'AO017', price: 310000, category: 'Áo', sizes: ['S', 'M', 'L'], stock: 58, featured: false },
  { name: 'Áo sơ mi be tay ngắn', code: 'AO018', price: 290000, category: 'Áo', sizes: ['S', 'M', 'L', 'XL'], stock: 60, featured: false },
  { name: 'Áo kiểu tím pastel phối nơ', code: 'AO019', price: 340000, category: 'Áo', sizes: ['S', 'M', 'L'], stock: 52, featured: false },
  { name: 'Áo sơ mi trắng tay phồng', code: 'AO020', price: 330000, category: 'Áo', sizes: ['S', 'M', 'L'], stock: 55, featured: false }
]


// Váy Đầm Công Sở - 20 sản phẩm
products.push(
  { name: 'Váy đầm công sở xanh navy cổ vest', code: 'VD001', price: 590000, category: 'Váy Đầm Công Sở', sizes: ['S', 'M', 'L', 'XL'], stock: 45, featured: false },
  { name: 'Đầm công sở đen dáng chữ A', code: 'VD002', price: 540000, category: 'Váy Đầm Công Sở', sizes: ['S', 'M', 'L', 'XL'], stock: 48, featured: false },
  { name: 'Váy đầm trắng công sở tay lỡ', code: 'VD003', price: 590000, category: 'Váy Đầm Công Sở', sizes: ['S', 'M', 'L', 'XL'], stock: 42, featured: false },
  { name: 'Đầm công sở xám cổ tròn thanh lịch', code: 'VD004', price: 580000, category: 'Váy Đầm Công Sở', sizes: ['S', 'M', 'L', 'XL'], stock: 45, featured: false },
  { name: 'Váy đầm hồng pastel dáng xòe nhẹ', code: 'VD005', price: 560000, category: 'Váy Đầm Công Sở', sizes: ['S', 'M', 'L', 'XL'], stock: 48, featured: false },
  { name: 'Đầm công sở xanh mint cổ sen', code: 'VD006', price: 570000, category: 'Váy Đầm Công Sở', sizes: ['S', 'M', 'L', 'XL'], stock: 45, featured: false },
  { name: 'Váy đầm be công sở tay ngắn', code: 'VD007', price: 550000, category: 'Váy Đầm Công Sở', sizes: ['S', 'M', 'L', 'XL'], stock: 50, featured: false },
  { name: 'Đầm công sở đỏ burgundy thanh lịch', code: 'VD008', price: 600000, category: 'Váy Đầm Công Sở', sizes: ['S', 'M', 'L', 'XL'], stock: 40, featured: false },
  { name: 'Váy đầm xanh lá dáng suông', code: 'VD009', price: 580000, category: 'Váy Đầm Công Sở', sizes: ['S', 'M', 'L', 'XL'], stock: 45, featured: false },
  { name: 'Đầm công sở tím pastel cổ V', code: 'VD010', price: 590000, category: 'Váy Đầm Công Sở', sizes: ['S', 'M', 'L', 'XL'], stock: 42, featured: false },
  { name: 'Váy đầm cam coral dáng xòe', code: 'VD011', price: 560000, category: 'Váy Đầm Công Sở', sizes: ['S', 'M', 'L', 'XL'], stock: 48, featured: false },
  { name: 'Đầm công sở trắng phối đen', code: 'VD012', price: 610000, category: 'Váy Đầm Công Sở', sizes: ['S', 'M', 'L', 'XL'], stock: 40, featured: false },
  { name: 'Váy đầm xanh dương cổ vuông', code: 'VD013', price: 580000, category: 'Váy Đầm Công Sở', sizes: ['S', 'M', 'L', 'XL'], stock: 45, featured: false },
  { name: 'Đầm công sở vàng mustard tay lỡ', code: 'VD014', price: 570000, category: 'Váy Đầm Công Sở', sizes: ['S', 'M', 'L', 'XL'], stock: 48, featured: false },
  { name: 'Váy đầm đen midi thanh lịch', code: 'VD015', price: 620000, category: 'Váy Đầm Công Sở', sizes: ['S', 'M', 'L', 'XL'], stock: 38, featured: false },
  { name: 'Đầm công sở hồng phấn cổ tròn', code: 'VD016', price: 590000, category: 'Váy Đầm Công Sở', sizes: ['S', 'M', 'L', 'XL'], stock: 42, featured: false },
  { name: 'Váy đầm xám xếp ly sang trọng', code: 'VD017', price: 630000, category: 'Váy Đầm Công Sở', sizes: ['S', 'M', 'L', 'XL'], stock: 40, featured: false },
  { name: 'Đầm công sở xanh navy phối trắng', code: 'VD018', price: 600000, category: 'Váy Đầm Công Sở', sizes: ['S', 'M', 'L', 'XL'], stock: 42, featured: false },
  { name: 'Váy đầm be nhạt dáng A', code: 'VD019', price: 580000, category: 'Váy Đầm Công Sở', sizes: ['S', 'M', 'L', 'XL'], stock: 45, featured: false },
  { name: 'Đầm công sở trắng ren cao cấp', code: 'VD020', price: 720000, category: 'Váy Đầm Công Sở', sizes: ['S', 'M', 'L'], stock: 28, featured: false }
)

// Áo Khoác - 20 sản phẩm
products.push(
  { name: 'Áo khoác blazer đen công sở', code: 'AK001', price: 690000, category: 'Áo Khoác', sizes: ['S', 'M', 'L', 'XL'], stock: 40, featured: false },
  { name: 'Áo khoác dạ xám thanh lịch', code: 'AK002', price: 840000, category: 'Áo Khoác', sizes: ['S', 'M', 'L', 'XL'], stock: 35, featured: false },
  { name: 'Áo khoác cardigan be dáng dài', code: 'AK003', price: 590000, category: 'Áo Khoác', sizes: ['S', 'M', 'L', 'XL'], stock: 45, featured: false },
  { name: 'Áo khoác blazer trắng cổ vest', code: 'AK004', price: 720000, category: 'Áo Khoác', sizes: ['S', 'M', 'L', 'XL'], stock: 38, featured: false },
  { name: 'Áo khoác denim xanh nhạt', code: 'AK005', price: 650000, category: 'Áo Khoác', sizes: ['S', 'M', 'L', 'XL'], stock: 42, featured: false },
  { name: 'Áo khoác len hồng pastel', code: 'AK006', price: 580000, category: 'Áo Khoác', sizes: ['S', 'M', 'L'], stock: 45, featured: false },
  { name: 'Áo khoác blazer navy phối nút', code: 'AK007', price: 710000, category: 'Áo Khoác', sizes: ['S', 'M', 'L', 'XL'], stock: 40, featured: false },
  { name: 'Áo khoác dạ camel cao cấp', code: 'AK008', price: 920000, category: 'Áo Khoác', sizes: ['S', 'M', 'L'], stock: 28, featured: true },
  { name: 'Áo khoác cardigan xanh mint', code: 'AK009', price: 560000, category: 'Áo Khoác', sizes: ['S', 'M', 'L', 'XL'], stock: 45, featured: false },
  { name: 'Áo khoác blazer đỏ burgundy', code: 'AK010', price: 730000, category: 'Áo Khoác', sizes: ['S', 'M', 'L', 'XL'], stock: 38, featured: false },
  { name: 'Áo khoác len trắng dáng ngắn', code: 'AK011', price: 590000, category: 'Áo Khoác', sizes: ['S', 'M', 'L'], stock: 45, featured: false },
  { name: 'Áo khoác blazer kẻ sọc', code: 'AK012', price: 750000, category: 'Áo Khoác', sizes: ['S', 'M', 'L', 'XL'], stock: 35, featured: false },
  { name: 'Áo khoác denim đen rách nhẹ', code: 'AK013', price: 680000, category: 'Áo Khoác', sizes: ['S', 'M', 'L', 'XL'], stock: 40, featured: false },
  { name: 'Áo khoác cardigan vàng mustard', code: 'AK014', price: 570000, category: 'Áo Khoác', sizes: ['S', 'M', 'L'], stock: 45, featured: false },
  { name: 'Áo khoác blazer xám xếp tay', code: 'AK015', price: 740000, category: 'Áo Khoác', sizes: ['S', 'M', 'L', 'XL'], stock: 38, featured: false },
  { name: 'Áo khoác dạ hồng phấn', code: 'AK016', price: 860000, category: 'Áo Khoác', sizes: ['S', 'M', 'L'], stock: 30, featured: true },
  { name: 'Áo khoác len xanh dương', code: 'AK017', price: 600000, category: 'Áo Khoác', sizes: ['S', 'M', 'L', 'XL'], stock: 42, featured: false },
  { name: 'Áo khoác blazer be nhạt', code: 'AK018', price: 720000, category: 'Áo Khoác', sizes: ['S', 'M', 'L', 'XL'], stock: 38, featured: false },
  { name: 'Áo khoác cardigan tím lavender', code: 'AK019', price: 580000, category: 'Áo Khoác', sizes: ['S', 'M', 'L'], stock: 45, featured: false },
  { name: 'Áo khoác dạ trắng sang trọng', code: 'AK020', price: 950000, category: 'Áo Khoác', sizes: ['S', 'M', 'L'], stock: 25, featured: true }
)

// Quần - 20 sản phẩm
products.push(
  { name: 'Quần tây đen ống đứng công sở', code: 'Q001', price: 450000, category: 'Quần', sizes: ['S', 'M', 'L', 'XL'], stock: 55, featured: false },
  { name: 'Quần âu xám xếp ly thanh lịch', code: 'Q002', price: 480000, category: 'Quần', sizes: ['S', 'M', 'L', 'XL'], stock: 50, featured: false },
  { name: 'Quần tây navy ống suông', code: 'Q003', price: 460000, category: 'Quần', sizes: ['S', 'M', 'L', 'XL'], stock: 52, featured: false },
  { name: 'Quần âu be nhạt lưng cao', code: 'Q004', price: 470000, category: 'Quần', sizes: ['S', 'M', 'L', 'XL'], stock: 50, featured: false },
  { name: 'Quần tây trắng ống rộng', code: 'Q005', price: 490000, category: 'Quần', sizes: ['S', 'M', 'L', 'XL'], stock: 48, featured: false },
  { name: 'Quần âu xanh mint ống đứng', code: 'Q006', price: 450000, category: 'Quần', sizes: ['S', 'M', 'L', 'XL'], stock: 55, featured: false },
  { name: 'Quần tây nâu chocolate công sở', code: 'Q007', price: 480000, category: 'Quần', sizes: ['S', 'M', 'L', 'XL'], stock: 50, featured: false },
  { name: 'Quần âu đen lưng cao xếp ly', code: 'Q008', price: 500000, category: 'Quần', sizes: ['S', 'M', 'L', 'XL'], stock: 45, featured: false },
  { name: 'Quần tây xám nhạt ống suông', code: 'Q009', price: 460000, category: 'Quần', sizes: ['S', 'M', 'L', 'XL'], stock: 52, featured: false },
  { name: 'Quần âu hồng pastel thanh lịch', code: 'Q010', price: 470000, category: 'Quần', sizes: ['S', 'M', 'L', 'XL'], stock: 50, featured: false },
  { name: 'Quần tây xanh navy ống rộng', code: 'Q011', price: 490000, category: 'Quần', sizes: ['S', 'M', 'L', 'XL'], stock: 48, featured: false },
  { name: 'Quần âu trắng kem lưng cao', code: 'Q012', price: 480000, category: 'Quần', sizes: ['S', 'M', 'L', 'XL'], stock: 50, featured: false },
  { name: 'Quần tây đen ống đứng basic', code: 'Q013', price: 450000, category: 'Quần', sizes: ['S', 'M', 'L', 'XL'], stock: 58, featured: false },
  { name: 'Quần âu vàng mustard công sở', code: 'Q014', price: 470000, category: 'Quần', sizes: ['S', 'M', 'L', 'XL'], stock: 50, featured: false },
  { name: 'Quần tây xám xếp ly sang trọng', code: 'Q015', price: 500000, category: 'Quần', sizes: ['S', 'M', 'L', 'XL'], stock: 45, featured: false },
  { name: 'Quần âu be ống suông', code: 'Q016', price: 460000, category: 'Quần', sizes: ['S', 'M', 'L', 'XL'], stock: 52, featured: false },
  { name: 'Quần tây xanh lá nhạt', code: 'Q017', price: 470000, category: 'Quần', sizes: ['S', 'M', 'L', 'XL'], stock: 50, featured: false },
  { name: 'Quần âu đen lưng thun', code: 'Q018', price: 440000, category: 'Quần', sizes: ['S', 'M', 'L', 'XL'], stock: 60, featured: false },
  { name: 'Quần tây tím lavender ống rộng', code: 'Q019', price: 480000, category: 'Quần', sizes: ['S', 'M', 'L', 'XL'], stock: 48, featured: false },
  { name: 'Quần âu trắng cao cấp', code: 'Q020', price: 520000, category: 'Quần', sizes: ['S', 'M', 'L', 'XL'], stock: 42, featured: false }
)

// Chân Váy - 20 sản phẩm
products.push(
  { name: 'Chân váy xòe đen công sở', code: 'CV001', price: 390000, category: 'Chân Váy', sizes: ['S', 'M', 'L', 'XL'], stock: 50, featured: false },
  { name: 'Chân váy bút chì xám thanh lịch', code: 'CV002', price: 420000, category: 'Chân Váy', sizes: ['S', 'M', 'L', 'XL'], stock: 48, featured: false },
  { name: 'Chân váy xòe trắng dáng A', code: 'CV003', price: 410000, category: 'Chân Váy', sizes: ['S', 'M', 'L', 'XL'], stock: 50, featured: false },
  { name: 'Chân váy midi navy xếp ly', code: 'CV004', price: 430000, category: 'Chân Váy', sizes: ['S', 'M', 'L', 'XL'], stock: 45, featured: false },
  { name: 'Chân váy xòe hồng pastel', code: 'CV005', price: 400000, category: 'Chân Váy', sizes: ['S', 'M', 'L', 'XL'], stock: 50, featured: false },
  { name: 'Chân váy bút chì đen lưng cao', code: 'CV006', price: 420000, category: 'Chân Váy', sizes: ['S', 'M', 'L', 'XL'], stock: 48, featured: false },
  { name: 'Chân váy xòe be nhạt', code: 'CV007', price: 390000, category: 'Chân Váy', sizes: ['S', 'M', 'L', 'XL'], stock: 52, featured: false },
  { name: 'Chân váy midi xám xếp ly', code: 'CV008', price: 440000, category: 'Chân Váy', sizes: ['S', 'M', 'L', 'XL'], stock: 45, featured: false },
  { name: 'Chân váy xòe xanh mint', code: 'CV009', price: 400000, category: 'Chân Váy', sizes: ['S', 'M', 'L', 'XL'], stock: 50, featured: false },
  { name: 'Chân váy bút chì đỏ burgundy', code: 'CV010', price: 430000, category: 'Chân Váy', sizes: ['S', 'M', 'L', 'XL'], stock: 45, featured: false },
  { name: 'Chân váy xòe trắng ren', code: 'CV011', price: 450000, category: 'Chân Váy', sizes: ['S', 'M', 'L', 'XL'], stock: 42, featured: false },
  { name: 'Chân váy midi navy công sở', code: 'CV012', price: 420000, category: 'Chân Váy', sizes: ['S', 'M', 'L', 'XL'], stock: 48, featured: false },
  { name: 'Chân váy xòe xanh dương', code: 'CV013', price: 410000, category: 'Chân Váy', sizes: ['S', 'M', 'L', 'XL'], stock: 50, featured: false },
  { name: 'Chân váy bút chì vàng mustard', code: 'CV014', price: 420000, category: 'Chân Váy', sizes: ['S', 'M', 'L', 'XL'], stock: 48, featured: false },
  { name: 'Chân váy midi đen xếp ly', code: 'CV015', price: 440000, category: 'Chân Váy', sizes: ['S', 'M', 'L', 'XL'], stock: 45, featured: false },
  { name: 'Chân váy xòe hồng phấn', code: 'CV016', price: 400000, category: 'Chân Váy', sizes: ['S', 'M', 'L', 'XL'], stock: 50, featured: false },
  { name: 'Chân váy bút chì xám nhạt', code: 'CV017', price: 420000, category: 'Chân Váy', sizes: ['S', 'M', 'L', 'XL'], stock: 48, featured: false },
  { name: 'Chân váy xòe be công sở', code: 'CV018', price: 390000, category: 'Chân Váy', sizes: ['S', 'M', 'L', 'XL'], stock: 52, featured: false },
  { name: 'Chân váy midi tím lavender', code: 'CV019', price: 430000, category: 'Chân Váy', sizes: ['S', 'M', 'L', 'XL'], stock: 45, featured: false },
  { name: 'Chân váy xòe trắng cao cấp', code: 'CV020', price: 480000, category: 'Chân Váy', sizes: ['S', 'M', 'L', 'XL'], stock: 40, featured: false }
)

async function seedProducts() {
  try {
    await sequelize.sync({ force: true })
    console.log('✅ Database synced')

    await Product.bulkCreate(products)
    console.log(`✅ Inserted ${products.length} products`)
    console.log('📊 Products by category:')
    const categories = {}
    products.forEach(p => {
      categories[p.category] = (categories[p.category] || 0) + 1
    })
    Object.entries(categories).forEach(([cat, count]) => {
      console.log(`   - ${cat}: ${count} products`)
    })

    console.log('🎉 Seed completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

seedProducts()
