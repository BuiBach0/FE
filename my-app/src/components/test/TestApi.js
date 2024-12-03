import React, { useState, useEffect } from 'react';

function SearchWithAPI() {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Hàm gọi API mỗi khi từ khóa thay đổi
  useEffect(() => {
    debugger
    if (searchTerm) {
      setIsLoading(true);
      fetch(`https://jsonplaceholder.typicode.com/users`)
        .then(response => response.json())
        .then(result => {
          // Lọc dữ liệu dựa trên từ khóa tìm kiếm
          const filteredData = result.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setData(filteredData);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Lỗi khi gọi API:', error);
          setIsLoading(false);
        });
    } else {
      setData([]); // Xóa dữ liệu khi không có từ khóa
    }
  }, [searchTerm]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  console.log(data,'---------------');
  
  return (
    <div>
      <input
        type="text"
        placeholder="Tìm kiếm người dùng..."
        value={searchTerm}
        onChange={handleChange}
      />
      {isLoading ? (
        <p>Đang tải...</p>
      ) : (
        <ul>
          {data.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchWithAPI;