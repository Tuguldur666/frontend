import React, { useState } from 'react';
import { ArrowLeft, Package, Trash2 } from 'lucide-react';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Item name', price: '$Price', quantity: 1, selected: true },
    { id: 2, name: 'Item name', price: '$Price', quantity: 1, selected: false },
    { id: 3, name: 'Item name', price: '$Price', quantity: 1, selected: true },
    { id: 4, name: 'Item name', price: '$Price', quantity: 1, selected: false }
  ]);

  const toggleItemSelection = (id) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <div className="bg-white min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center mb-8 pb-4 border-b-2 border-black">
        <ArrowLeft className="w-6 h-6 text-black mr-4 cursor-pointer" />
        <h1 className="text-2xl font-bold text-black">Continue shopping</h1>
      </div>

      <div className="flex gap-8">
        {/* Shopping Cart */}
        <div className="flex-1">
          <h2 className="text-xl font-bold text-black mb-2">Shopping cart</h2>
          <p className="text-black mb-6">You have {cartItems.length} items in your cart</p>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div 
                key={item.id} 
                className="flex items-center p-4 border-2 border-black rounded-lg bg-white"
              >
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={item.selected}
                  onChange={() => toggleItemSelection(item.id)}
                  className="w-5 h-5 mr-4 accent-black"
                />

                {/* Item Image Placeholder */}
                <div className="w-16 h-16 border-2 border-black rounded mr-4 flex items-center justify-center bg-white">
                  <Package className="w-8 h-8 text-black" />
                </div>

                {/* Item Details */}
                <div className="flex-1">
                  <h3 className="font-semibold text-black text-lg">{item.name}</h3>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center mx-4">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 border border-black rounded-l bg-white text-black hover:bg-gray-100 flex items-center justify-center font-bold"
                  >
                    -
                  </button>
                  <span className="w-12 h-8 border-t border-b border-black bg-white flex items-center justify-center text-black font-semibold">
                    {item.quantity}
                  </span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 border border-black rounded-r bg-white text-black hover:bg-gray-100 flex items-center justify-center font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Price */}
                <div className="text-black font-semibold text-lg mx-4 min-w-20">
                  {item.price}
                </div>

                {/* Delete Button */}
                <button 
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-black hover:bg-gray-100 rounded"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="w-80">
          <div className="bg-black text-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-6 text-center">Төлбөр төлөх сонголтоо хийнэ үү</h3>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Payment Method 1 */}
              <div className="bg-gray-200 p-4 rounded-lg text-center cursor-pointer hover:bg-gray-300 transition-colors">
                <div className="flex justify-center mb-3">
                  <div className="flex space-x-1">
                    <div className="w-6 h-1 bg-black rounded"></div>
                    <div className="w-6 h-1 bg-black rounded transform rotate-45 origin-left"></div>
                  </div>
                </div>
                <div className="text-black font-bold text-sm">
                  ДАНС<br />
                  ШИЛЖҮҮЛЭГ
                </div>
              </div>

              {/* Payment Method 2 */}
              <div className="bg-gray-200 p-4 rounded-lg text-center cursor-pointer hover:bg-gray-300 transition-colors">
                <div className="flex justify-center mb-3">
                  <div className="flex space-x-1">
                    <div className="w-6 h-1 bg-black rounded"></div>
                    <div className="w-6 h-1 bg-black rounded transform -rotate-45 origin-right"></div>
                  </div>
                </div>
                <div className="text-black font-bold text-sm">QPAY</div>
              </div>
            </div>

            {/* Checkout Button */}
            <button className="w-full bg-white text-black font-bold py-3 px-6 rounded-lg mt-6 hover:bg-gray-100 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;