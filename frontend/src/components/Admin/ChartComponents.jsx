import React, { useEffect, useRef } from 'react';

// Utility function for animation easing (not used in UserDistributionChart anymore)
const easeOutQuad = (t) => 1 - (1 - t) * (1 - t);

// Revenue by Tour Line Chart (Unchanged, fixed unused 'tooltip')
const RevenueByTourChart = ({ data }) => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const parent = canvas.parentElement;
    canvas.width = parent.clientWidth - 48;
    canvas.height = 400;

    const width = canvas.width;
    const height = canvas.height;

    const padding = 60;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const maxValue = Math.max(...data.map((item) => item.value), 1);
    const pointSpacing = chartWidth / (Math.max(data.length - 1, 1));

    let roundedMax;
    let ySteps;
    if (maxValue <= 1000) {
      roundedMax = Math.ceil(maxValue / 200) * 200;
      ySteps = 5;
    } else if (maxValue <= 5000) {
      roundedMax = Math.ceil(maxValue / 1000) * 1000;
      ySteps = Math.ceil(roundedMax / 1000);
    } else {
      roundedMax = Math.ceil(maxValue / 2000) * 2000;
      ySteps = Math.ceil(roundedMax / 2000);
    }
    const yStepValue = roundedMax / ySteps;

    let animationProgress = 0;
    const animationDuration = 1000;

    let tooltipVisible = false;
    let tooltipX = 0;
    let tooltipY = 0;
    let tooltipText = '';

    const truncateLabel = (label, maxLength = 12) => {
      if (label.length > maxLength) return label.substring(0, maxLength - 3) + '...';
      return label;
    };

    const draw = (progress) => {
      ctx.clearRect(0, 0, width, height);

      ctx.beginPath();
      ctx.moveTo(padding, padding);
      ctx.lineTo(padding, height - padding);
      ctx.lineTo(width - padding, height - padding);
      ctx.strokeStyle = '#d1d5db';
      ctx.lineWidth = 1;
      ctx.stroke();

      for (let i = 0; i <= ySteps; i++) {
        const y = height - padding - (i * chartHeight) / ySteps;
        const value = i * yStepValue;
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(value.toLocaleString(), padding - 10, y + 5);
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.strokeStyle = '#f3f4f6';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      data.forEach((item, index) => {
        const x = padding + index * pointSpacing;
        const truncatedLabel = truncateLabel(item.name, 12);
        ctx.save();
        ctx.translate(x, height - padding + 20);
        ctx.rotate(-Math.PI / 6);
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(truncatedLabel, 0, 0);
        ctx.restore();
        ctx.fillStyle = 'rgba(0, 0, 0, 0)';
        ctx.fillRect(x - 50, height - padding + 20, 100, 30);
      });

      const points = data.map((item, index) => {
        const x = padding + index * pointSpacing;
        const y = height - padding - (item.value / roundedMax) * chartHeight * progress;
        return { x, y, value: item.value, name: item.name };
      });

      const gradient = ctx.createLinearGradient(0, height - padding, 0, padding);
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0)');
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0.2)');

      ctx.beginPath();
      ctx.moveTo(points[0]?.x || padding, height - padding);
      for (let i = 0; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
      ctx.lineTo(points[points.length - 1]?.x || padding, height - padding);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(points[0]?.x || padding, points[0]?.y || height - padding);
      for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
      ctx.strokeStyle = 'rgb(59, 130, 246)';
      ctx.lineWidth = 2;
      ctx.shadowColor = 'rgba(59, 132, 246, 0.5)';
      ctx.shadowBlur = 5;
      ctx.stroke();
      ctx.shadowBlur = 0;

      points.forEach((point) => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgb(59, 130, 246)';
        ctx.fill();
      });

      points.forEach((point) => {
        ctx.fillStyle = '#374151';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        const labelY = point.y - 15 < padding ? padding + 15 : point.y - 15;
        ctx.fillText(`$${point.value.toLocaleString()}`, point.x, labelY);
      });

      if (tooltipVisible) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.font = '12px Arial';
        const textWidth = ctx.measureText(tooltipText).width;
        const tooltipWidth = textWidth + 10;
        const tooltipHeight = 20;
        let tooltipXAdjusted = tooltipX;
        if (tooltipX + tooltipWidth > width) tooltipXAdjusted = width - tooltipWidth - 5;
        if (tooltipX < 0) tooltipXAdjusted = 5;
        let tooltipYAdjusted = tooltipY;
        if (tooltipY - tooltipHeight - 5 < 0) tooltipYAdjusted = tooltipHeight + 5;
        ctx.fillRect(tooltipXAdjusted, tooltipYAdjusted - tooltipHeight - 5, tooltipWidth, tooltipHeight);
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.fillText(tooltipText, tooltipXAdjusted + tooltipWidth / 2, tooltipYAdjusted - 10);
      }
    };

    const animate = (timestamp) => {
      if (!animationFrameRef.current.start) animationFrameRef.current.start = timestamp;
      const elapsed = timestamp - animationFrameRef.current.start;
      animationProgress = Math.min(elapsed / animationDuration, 1);
      animationProgress = easeOutQuad(animationProgress);
      draw(animationProgress);
      if (animationProgress < 1) animationFrameRef.current.id = requestAnimationFrame(animate);
    };

    animationFrameRef.current = { id: null, start: null };
    requestAnimationFrame(animate);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      let closestPoint = null;
      let minDistance = Infinity;

      data.forEach((item, index) => {
        const x = padding + index * pointSpacing;
        const y = height - padding - (item.value / roundedMax) * chartHeight;
        const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);
        if (distance < minDistance && distance < 20) {
          minDistance = distance;
          closestPoint = { x, y, value: item.value, name: item.name };
        }
        if (
          mouseX >= x - 50 &&
          mouseX <= x + 50 &&
          mouseY >= height - padding + 20 &&
          mouseY <= height - padding + 50 &&
          item.name.length > 12
        ) {
          tooltipVisible = true;
          tooltipX = x;
          tooltipY = height - padding + 10;
          tooltipText = item.name;
          return;
        }
      });

      if (closestPoint && !tooltipVisible) {
        tooltipVisible = true;
        tooltipX = closestPoint.x;
        tooltipY = closestPoint.y;
        tooltipText = `${closestPoint.name}: $${closestPoint.value.toLocaleString()}`;
      } else if (!tooltipVisible) {
        tooltipVisible = false;
      }

      draw(animationProgress);
    };

    const handleMouseLeave = () => {
      tooltipVisible = false;
      draw(animationProgress);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameRef.current.id);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [data]);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Revenue by Tour</h3>
      <div className="relative">
        <canvas ref={canvasRef} height={400} className="w-full"></canvas>
      </div>
    </div>
  );
};

// Booking Status Bar Chart (Unchanged, fixed unused 'tooltip' and 'y')
const BookingStatusChart = ({ data }) => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const hoverStateRef = useRef({});

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const parent = canvas.parentElement;
    canvas.width = parent.clientWidth - 48;
    canvas.height = 300;

    const width = canvas.width;
    const height = canvas.height;

    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const maxValue = Math.max(...data.map((item) => item.value), 1);
    const barWidth = chartWidth / data.length - 10;

    const roundedMax = Math.ceil(maxValue);
    const yStep = roundedMax / 5;

    const colors = {
      pending: '#FBBF24',
      completed: '#10B981',
      cancelled: '#EF4444',
    };

    let animationProgress = 0;
    const animationDuration = 1000;

    let tooltipVisible = false;
    let tooltipX = 0;
    let tooltipY = 0;
    let tooltipText = '';

    const hoverScales = data.reduce((acc, item, index) => {
      acc[index] = 1;
      return acc;
    }, {});
    hoverStateRef.current = hoverScales;

    const draw = (progress) => {
      ctx.clearRect(0, 0, width, height);

      ctx.beginPath();
      ctx.moveTo(padding, padding);
      ctx.lineTo(padding, height - padding);
      ctx.lineTo(width - padding, height - padding);
      ctx.strokeStyle = '#d1d5db';
      ctx.lineWidth = 1;
      ctx.stroke();

      for (let i = 0; i <= 5; i++) {
        const y = height - padding - (i * chartHeight) / 5;
        const value = i * yStep;
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(value.toLocaleString(), padding - 10, y + 5);
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.strokeStyle = '#f3f4f6';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      data.forEach((item, index) => {
        const barHeight = (item.value / roundedMax) * chartHeight * progress;
        const x = padding + index * (barWidth + 10);
        const y = height - padding - barHeight;
        const scale = hoverStateRef.current[index] || 1;

        const scaledBarWidth = barWidth * scale;
        const scaledX = x - (scaledBarWidth - barWidth) / 2;
        const scaledBarHeight = barHeight * scale;
        const scaledY = height - padding - scaledBarHeight;

        const depth = 10;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.beginPath();
        ctx.moveTo(scaledX + scaledBarWidth, scaledY);
        ctx.lineTo(scaledX + scaledBarWidth + depth, scaledY - depth);
        ctx.lineTo(scaledX + scaledBarWidth + depth, scaledY - depth + scaledBarHeight);
        ctx.lineTo(scaledX + scaledBarWidth, scaledY + scaledBarHeight);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(scaledX + scaledBarWidth, scaledY + scaledBarHeight);
        ctx.lineTo(scaledX + scaledBarWidth + depth, scaledY + scaledBarHeight - depth);
        ctx.lineTo(scaledX + depth, scaledY + scaledBarHeight + depth);
        ctx.lineTo(scaledX, scaledY + scaledBarHeight);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = colors[item.name.toLowerCase()] || '#6b7280';
        ctx.fillRect(scaledX, scaledY, scaledBarWidth, scaledBarHeight);

        ctx.fillStyle = '#374151';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(item.value.toLocaleString(), scaledX + scaledBarWidth / 2, scaledY - 10);

        ctx.fillStyle = '#6b7280';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(item.name.charAt(0).toUpperCase() + item.name.slice(1), scaledX + scaledBarWidth / 2, height - padding + 15);
      });

      if (tooltipVisible) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.font = '12px Arial';
        const textWidth = ctx.measureText(tooltipText).width;
        const tooltipWidth = textWidth + 10;
        const tooltipHeight = 20;
        let tooltipXAdjusted = tooltipX;
        if (tooltipX + tooltipWidth > width) tooltipXAdjusted = width - tooltipWidth - 5;
        if (tooltipX < 0) tooltipXAdjusted = 5;
        ctx.fillRect(tooltipXAdjusted, tooltipY - tooltipHeight - 5, tooltipWidth, tooltipHeight);
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.fillText(tooltipText, tooltipXAdjusted + tooltipWidth / 2, tooltipY - 10);
      }
    };

    const animate = (timestamp) => {
      if (!animationFrameRef.current.start) animationFrameRef.current.start = timestamp;
      const elapsed = timestamp - animationFrameRef.current.start;
      animationProgress = Math.min(elapsed / animationDuration, 1);
      animationProgress = easeOutQuad(animationProgress);
      draw(animationProgress);
      if (animationProgress < 1) animationFrameRef.current.id = requestAnimationFrame(animate);
    };

    animationFrameRef.current = { id: null, start: null };
    requestAnimationFrame(animate);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      let closestBar = null;
      let minDistance = Infinity;

      data.forEach((item, index) => {
        const barHeight = (item.value / roundedMax) * chartHeight;
        const x = padding + index * (barWidth + 10);
        if (mouseX >= x && mouseX <= x + barWidth && mouseY >= (height - padding - barHeight) && mouseY <= height - padding) {
          const distance = Math.sqrt((mouseX - (x + barWidth / 2)) ** 2 + (mouseY - (height - padding - barHeight)) ** 2);
          if (distance < minDistance) {
            minDistance = distance;
            closestBar = { x: x + barWidth / 2, value: item.value, name: item.name };
          }
        }
      });

      if (closestBar) {
        tooltipVisible = true;
        tooltipX = closestBar.x;
        tooltipY = height - padding - ((closestBar.value / roundedMax) * chartHeight);
        tooltipText = `${closestBar.name.charAt(0).toUpperCase() + closestBar.name.slice(1)}: ${closestBar.value}`;
      } else {
        tooltipVisible = false;
      }

      draw(animationProgress);
    };

    const handleMouseLeave = () => {
      tooltipVisible = false;
      Object.keys(hoverStateRef.current).forEach((index) => {
        hoverStateRef.current[index] = 1;
      });
      draw(animationProgress);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameRef.current.id);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [data]);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Booking Status Distribution</h3>
      <div className="relative">
        <canvas ref={canvasRef} height={300} className="w-full"></canvas>
      </div>
    </div>
  );
};

// User Distribution Simple Pie Chart (No animation, no 3D)
const UserDistributionChart = ({ data }) => {
  const canvasRef = useRef(null);
  const legendRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const legend = legendRef.current;

    canvas.width = 200;
    canvas.height = 200;

    const width = canvas.width;
    const height = canvas.height;

    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 20;

    // Calculate total based on all data (including zeros) for percentage calculations
    const totalAll = data.reduce((sum, item) => sum + item.value, 0) || 1;
    // Filter out zero-value data for rendering slices
    const nonZeroData = data.filter((item) => item.value > 0);
    // Total for rendering pie slices
    const totalNonZero = nonZeroData.reduce((sum, item) => sum + item.value, 0) || 1;

    const colors = ['#3B82F6', '#10B981', '#8B5CF6'];

    let tooltipVisible = false;
    let tooltipX = 0;
    let tooltipY = 0;
    let tooltipText = '';

    // Draw static pie chart
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      let startAngle = 0;
      const slices = nonZeroData.map((item, index) => {
        const sliceAngle = (item.value / totalNonZero) * 2 * Math.PI;
        const endAngle = startAngle + sliceAngle;
        const percentage = ((item.value / totalAll) * 100).toFixed(1);
        const result = { startAngle, endAngle, percentage, value: item.value, name: item.name, index };
        startAngle = endAngle;
        return result;
      });

      // Draw slices
      slices.forEach((slice) => {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, slice.startAngle, slice.endAngle);
        ctx.lineTo(centerX, centerY);
        ctx.closePath();
        ctx.fillStyle = colors[slice.index % colors.length];
        ctx.fill();

        // Draw border for clarity
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, slice.startAngle, slice.endAngle);
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();
      });

      if (tooltipVisible) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.font = '12px Arial';
        const textWidth = ctx.measureText(tooltipText).width;
        const tooltipWidth = textWidth + 10;
        const tooltipHeight = 20;
        let tooltipXAdjusted = tooltipX;
        let tooltipYAdjusted = tooltipY;
        if (tooltipX + tooltipWidth > width) tooltipXAdjusted = width - tooltipWidth - 5;
        if (tooltipX < 0) tooltipXAdjusted = 5;
        if (tooltipY - tooltipHeight - 5 < 0) tooltipYAdjusted = tooltipHeight + 5;
        ctx.fillRect(tooltipXAdjusted, tooltipYAdjusted - tooltipHeight - 5, tooltipWidth, tooltipHeight);
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.fillText(tooltipText, tooltipXAdjusted + tooltipWidth / 2, tooltipYAdjusted - 10);
      }
    };

    // Initial draw
    draw();

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const dx = mouseX - centerX;
      const dy = mouseY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) < 0 ? Math.atan2(dy, dx) + 2 * Math.PI : Math.atan2(dy, dx);

      let hoveredSlice = null;
      let startAngle = 0;

      nonZeroData.forEach((item, index) => {
        const sliceAngle = (item.value / totalNonZero) * 2 * Math.PI;
        const endAngle = startAngle + sliceAngle;

        if (distance <= radius && angle >= startAngle && angle <= endAngle) {
          hoveredSlice = { index, name: item.name, value: item.value, percentage: ((item.value / totalAll) * 100).toFixed(1) };
        }

        startAngle = endAngle;
      });

      if (hoveredSlice) {
        tooltipVisible = true;
        tooltipX = mouseX;
        tooltipY = mouseY;
        tooltipText = `${hoveredSlice.name}: ${hoveredSlice.value} (${hoveredSlice.percentage}%)`;
      } else {
        tooltipVisible = false;
      }

      draw();
    };

    const handleMouseLeave = () => {
      tooltipVisible = false;
      draw();
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Populate legend
    legend.innerHTML = '';
    data.forEach((item, index) => {
      const percentage = ((item.value / totalAll) * 100).toFixed(1);
      const legendItem = document.createElement('div');
      legendItem.className = 'flex items-center space-x-2 cursor-pointer hover:bg-gray-100 rounded px-1 transition-colors duration-200';
      legendItem.innerHTML = `
        <span class="w-4 h-4 inline-block rounded-full" style="background-color: ${colors[index % colors.length]};"></span>
        <span class="text-gray-600 text-sm">${item.name} (${item.value}, ${percentage}%)</span>
      `;
      legend.appendChild(legendItem);
    });

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [data]);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">User Distribution</h3>
      <div className="flex justify-center items-center space-x-6">
        <canvas ref={canvasRef} width={200} height={200} className="w-40 h-40"></canvas>
        <div ref={legendRef} className="flex flex-col space-y-2"></div>
      </div>
    </div>
  );
};

export { RevenueByTourChart, BookingStatusChart, UserDistributionChart };