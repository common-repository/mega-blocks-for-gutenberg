<div class="mbg-pricing-table" id="<?php echo $unique_id; ?>">
  <div class="plan" style="border-radius: <?php echo $border_radius; ?>; background-color: <?php echo $bg_color; ?>">
    <header>
      <h4 style="color:<?php echo $header_color; ?>" class="plan-title">   
        <?php echo $price_header; ?>
      </h4>
      <div class="plan-cost"><span class="plan-price" style="color:<?php echo $price_color; ?>"><?php echo $price; ?></span><span class="plan-type" style="color:<?php echo $tag_line_color ?>"><?php echo $tag_line; ?></span></div>
    </header>
    <ul class="plan-features">
      <?php echo $content; ?>
    </ul>
    <div class="plan-select">
      <a style="border-radius: <?php echo $btn_border_radius; ?>; background-color: <?php echo $btn_background_color; ?>; color: <?php echo $btn_text_color; ?>" target="<?php echo $link_target; ?>" href="<?php echo $btn_url; ?>"><?php echo $btn_text ?></a>
    </div>
  </div>
</div>
<style type="text/css">
  #<?php echo $unique_id; ?> .plan-features li {
    font-size: <?php echo $content_font_size ?>px;
    color:<?php echo $content_color; ?>;
  }
  #<?php echo $unique_id; ?> .plan-select a:hover {
    color:<?php echo $btn_text_color_h; ?> !important;
    background-color:<?php echo $btn_background_color_h; ?> !important;
  }
</style>